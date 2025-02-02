type RenderHTML = {
  content: string;
};
const RenderHTML = ({ content }: RenderHTML) => {
  // Function to decode HTML entities to their respective characters

  console.log("raw content", content);
  const decodeHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.documentElement.textContent || "";
  };

  const decodedContent = decodeHtml(content);

  // // Modify image src to handle local images (Base64 URLs or relative URLs)
  // const handleLocalImages = (html: string) => {
  //   const imageRegex = /<img\s+[^>]*src="([^"]+)"/g;
  //   return html.replace(imageRegex, (match, src) => {
  //     // Check if the src is a relative path or base64, and adjust accordingly
  //     if (src.startsWith("file://") || src.startsWith("data:image")) {
  //       return match; // Keep the base64 or local file URL as is
  //     }
  //     // If it's an external URL, handle as needed
  //     return match;
  //   });
  // };
  // Modify image src to handle local images (Base64 URLs or relative URLs)
  // Modify image src to handle local images (Base64 URLs or relative URLs)
  const handleLocalImages = (html: string) => {
    const imageRegex = /<img\s+[^>]*src="([^"]+)"/g;

    return html.replace(imageRegex, (match, src) => {
      // Check if the src is a base64 image or is already an uploaded image URL
      if (src.startsWith("data:image") || src.startsWith("https://") || src.startsWith("http://")) {
        return match; // Allow base64 or external URLs to pass through unchanged
      }

      // If the src is a local file (file://), handle it by replacing with your server URL
      if (src.startsWith("file://")) {
        // Assuming the file name includes the extension (e.g., "image.jpg")
        const filePath = src.replace("file://", "http://localhost:5000/uploads/");

        // Check if the file path has a valid image extension (jpeg, png, jpg, etc.)
        if (/\.(jpeg|jpg|png|gif|bmp)$/i.test(filePath)) {
          return match.replace(src, filePath); // Replace local file URL with server URL
        } else {
          console.warn("Invalid image extension detected:", filePath);
          return match; // If invalid, don't modify the URL
        }
      }

      // Handle other cases (e.g., relative paths already starting with /uploads/)
      if (src.startsWith("/uploads/")) {
        return match; // If it's already a relative path (e.g., /uploads/), leave it unchanged
      }
      return match;
    });
  };
  const updatedContent = handleLocalImages(decodedContent);

  console.log("content", updatedContent);

  return <div dangerouslySetInnerHTML={{ __html: updatedContent }} />;
};

export default RenderHTML;
