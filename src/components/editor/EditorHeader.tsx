import { HiOutlineXMark } from "react-icons/hi2";
import { StyledHeader, StyledIcons, StyledMark } from "./sqlEditor.styles";

type EditorHeaderProps = {
  setShowEditor: (val: boolean) => void;
  elementRef: any;
};

export const EditorHeader = ({ setShowEditor, elementRef }: EditorHeaderProps) => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (elementRef.current) {
        elementRef.current.requestFullscreen().catch((err: any) => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <StyledHeader>
      <StyledIcons>
        <StyledMark>
          <div
            onClick={toggleFullScreen}
            style={{ width: "12px", height: "12px", border: "1px solid var(--color-white)" }}
          />
        </StyledMark>
        <StyledMark onClick={() => setShowEditor(false)}>
          <HiOutlineXMark />
        </StyledMark>
      </StyledIcons>
    </StyledHeader>
  );
};

export default EditorHeader;
