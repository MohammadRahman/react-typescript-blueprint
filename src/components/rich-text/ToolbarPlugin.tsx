import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
import {
  Bold,
  Italic,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Link,
  Table,
} from "lucide-react";
import styled from "styled-components";

const ToolbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  padding: 8px;
  border-top: 1px solid var(--color-grey-20);
  background-color: var(--color-grey-50);
`;

const ToolbarButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  &:hover {
    opacity: 0.7;
  }
`;

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <ToolbarContainer>
      <ToolbarButton
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <Bold size={18} />
      </ToolbarButton>
      <ToolbarButton
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <Italic size={18} />
      </ToolbarButton>
      <ToolbarButton
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
      >
        <Code size={18} />
      </ToolbarButton>

      {/* Text Alignment */}
      <ToolbarButton
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
      >
        <AlignLeft size={18} />
      </ToolbarButton>
      <ToolbarButton
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
      >
        <AlignCenter size={18} />
      </ToolbarButton>
      <ToolbarButton
        type="button"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
      >
        <AlignRight size={18} />
      </ToolbarButton>
    </ToolbarContainer>
  );
};

// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from "lexical";
// import { Bold, Italic, Code, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
// import styled from "styled-components";

// const ToolbarContainer = styled.div`
//   position: absolute;
//   bottom: 0;
//   display: flex;
//   justify-content: flex-start;
//   gap: 8px;
//   padding: 8px;
//   border-top: 1px solid var(--color-grey-20);
//   background-color: var(--color-grey-50);
// `;

// const ToolbarButton = styled.button`
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   padding: 4px;
//   &:hover {
//     opacity: 0.7;
//   }
// `;

// export const ToolbarPlugin = () => {
//   const [editor] = useLexicalComposerContext();

//   return (
//     <ToolbarContainer>
//       <ToolbarButton
//         type="button"
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
//       >
//         <Bold size={18} />
//       </ToolbarButton>
//       <ToolbarButton
//         type="button"
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
//       >
//         <Italic size={18} />
//       </ToolbarButton>

//       <ToolbarButton
//         type="button"
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
//       >
//         <Code size={18} />
//       </ToolbarButton>
//       <ToolbarButton
//         type="button"
//         onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
//       >
//         <AlignLeft size={18} />
//       </ToolbarButton>
//       <ToolbarButton
//         type="button"
//         onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
//       >
//         <AlignCenter size={18} />
//       </ToolbarButton>
//       <ToolbarButton
//         type="button"
//         onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
//       >
//         <AlignRight size={18} />
//       </ToolbarButton>
//     </ToolbarContainer>
//   );
// };
