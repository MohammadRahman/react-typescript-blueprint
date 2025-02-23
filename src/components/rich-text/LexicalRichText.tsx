import { Controller } from "react-hook-form";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import styled from "styled-components";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { AutocompleteMentionPlugin } from "./MentionPlugin";

const StyledEditor = styled.div`
  border: 1px solid var(--color-grey-20);
  height: 230px;
  max-height: 400px;
  overflow: auto;
  background-color: var(--color-grey-100);
  padding: 10px;
  border-radius: 4px;
  position: relative;
  .editor-input {
    outline: none;
  }
`;

type RichTextProps = {
  name: string;
  control?: any;
  fieldValues: string[];
};

export const RichText = ({ control, name, fieldValues }: RichTextProps) => {
  const initialConfig = {
    namespace: "MyEditor",
    onError(error: any) {
      console.error(error);
    },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LexicalComposer initialConfig={initialConfig}>
          <StyledEditor>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Type here...</div>}
              ErrorBoundary={() => <div>Error!</div>}
            />
            <HistoryPlugin />
            <AutocompleteMentionPlugin values={fieldValues} />
            <ToolbarPlugin />
            <OnChangePlugin
              onChange={editorState => {
                editorState.read(() => {
                  const markdown = $convertToMarkdownString(TRANSFORMERS);
                  field.onChange(markdown);
                });
              }}
            />
          </StyledEditor>
        </LexicalComposer>
      )}
    />
  );
};
