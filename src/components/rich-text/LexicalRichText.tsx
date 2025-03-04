import { Controller } from "react-hook-form";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import styled from "styled-components";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { AutocompleteMentionPlugin } from "./MentionPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

const StyledEditor = styled.div`
  border: 1px solid var(--color-grey-20);
  min-height: 230px;
  height: 380px;
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
  rules?: any;
};
function InitializeEditorPlugin({ initialValue }: { initialValue: string }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialValue) {
      editor.update(() => {
        $convertFromMarkdownString(initialValue, TRANSFORMERS);
      });
    }
  }, [editor]);

  return null;
}
export const RichText = ({ control, name, rules, fieldValues }: RichTextProps) => {
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
      rules={rules}
      render={({ field }) => {
        console.log("Field value:", field.value);
        return (
          <LexicalComposer
            initialConfig={{
              ...initialConfig,
            }}
          >
            <InitializeEditorPlugin initialValue={field.value} />
            <StyledEditor>
              <RichTextPlugin
                contentEditable={<ContentEditable className="editor-input" />}
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
        );
      }}
    />
  );
};
