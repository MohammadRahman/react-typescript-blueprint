import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const EditorWrapper = styled.div`
  width: 50vw;
  height: 50vh;
  margin-top: 1rem;
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-grey-900);
  position: relative;

  button {
    display: block;
    margin: 1rem auto;
    padding: 0.5rem 1rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: var(--color-primary-dark);
    }
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: 1px;
  background: transparent;
  border: none;
  color: white;
  font-size: 3rem;

  &:hover {
    cursor: pointer;
  }
`;
type SQLQueryEditorProps = {
  setShowEditor: (t: boolean) => void;
  query: string;
  setQuery: (value: string) => void;
};
const SQLQueryEditor = ({ setShowEditor, query, setQuery }: SQLQueryEditorProps) => {
  const [value] = useState("");
  const [isEditorVisible, setIsEditorVisible] = useState(true);

  const editorRef = useRef();

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };
  const handleEditorChange = (value: string | undefined) => {
    setQuery(value || "");
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
  };

  return createPortal(
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        top: "33%",
        left: "30%",
        width: "40rem",
        height: "50rem",
      }}
    >
      {isEditorVisible && (
        <>
          <EditorWrapper>
            <Editor
              height="100%"
              defaultLanguage="sql"
              defaultValue={query}
              theme="vs-dark"
              onMount={onMount}
              onChange={handleEditorChange}
              value={value}
            />
            <CloseButton onClick={handleCloseEditor}>×</CloseButton>
            <div
              style={{
                position: "absolute",
                right: "0",
                bottom: "0",
                display: "flex",
                gap: "0.5rem",
                background: "blue",
              }}
            >
              <button type="button" onClick={handleCloseEditor}>
                Save
              </button>
            </div>
          </EditorWrapper>
        </>
      )}
    </div>,
    document.body
  );
};

export default SQLQueryEditor;
