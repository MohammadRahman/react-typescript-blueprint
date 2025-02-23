type RenderHTML = {
  content: string;
};
const RenderHTML = ({ content }: RenderHTML) => {
  const decodeHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  const decodedContent = decodeHtml(content);
  const handleLocalImages = (html: string) => {
    const imageRegex = /<img\s+[^>]*src="([^"]+)"/g;

    return html.replace(imageRegex, (match, src) => {
      if (src.startsWith("data:image") || src.startsWith("https://") || src.startsWith("http://")) {
        return match;
      }

      if (src.startsWith("file://")) {
        const filePath = src.replace("file://", "http://localhost:5000/uploads/");

        if (/\.(jpeg|jpg|png|gif|bmp)$/i.test(filePath)) {
          return match.replace(src, filePath);
        } else {
          console.warn("Invalid image extension detected:", filePath);
          return match;
        }
      }
      if (src.startsWith("/uploads/")) {
        return match;
      }
      return match;
    });
  };
  const updatedContent = handleLocalImages(decodedContent);

  console.log("content", updatedContent);

  return <div dangerouslySetInnerHTML={{ __html: updatedContent }} />;
};

export default RenderHTML;
