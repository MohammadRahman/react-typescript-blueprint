import { useState, useCallback, useMemo } from "react";
import { $getSelection, $createTextNode, $insertNodes, $setSelection, TextNode } from "lexical";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  MenuTextMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import styled from "styled-components";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ReactDOM from "react-dom";

const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 150px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

class MentionOption extends MenuOption {
  constructor(
    public trigger: string,
    public value: string
  ) {
    super(value);
  }
}
type Props = {
  values: string[];
};

export const AutocompleteMentionPlugin = ({ values }: Props) => {
  const [editor] = useLexicalComposerContext();
  const [query, setQuery] = useState<string | null>(null);

  const mentionItems = useMemo(() => {
    return {
      "@": ["Model"],
      ".": values,
    };
  }, [values]);

  // Check for trigger characters (@ or .)
  const checkForTriggers = useCallback((text: string): MenuTextMatch | null => {
    const match = text.match(/[@.]\w*$/);
    if (match) {
      return {
        leadOffset: match.index || 0,
        matchingString: match[0],
        replaceableString: match[0],
      };
    }
    return null;
  }, []);

  // Get options based on the trigger
  const getOptions = useCallback(
    (trigger: string): MentionOption[] => {
      if (trigger === "@") {
        return mentionItems["@"].map(item => new MentionOption(trigger, item));
      } else if (trigger === ".") {
        return mentionItems["."].map(item => new MentionOption(trigger, item));
      }
      return [];
    },
    [mentionItems]
  );

  // Handle option selection
  const onSelectOption = useCallback(
    (selectedOption: MentionOption, nodeToReplace: TextNode | null, closeMenu: () => void) => {
      editor.update(() => {
        const textNode = $createTextNode(selectedOption.value);
        $insertNodes([textNode]);
        // Move the cursor to the end of the inserted text
        const selection = $getSelection();
        if (selection) {
          selection.insertNodes([textNode]);
          $setSelection(selection);
        }
      });
      closeMenu();
    },
    [editor]
  );

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQuery}
      triggerFn={checkForTriggers}
      options={query ? getOptions(query[0]) : []}
      onSelectOption={onSelectOption}
      menuRenderFn={(anchorElementRef, { selectedIndex, selectOptionAndCleanUp, options }) =>
        anchorElementRef.current
          ? ReactDOM.createPortal(
              <div className="typeahead-popover mentions-menu">
                <Dropdown>
                  {options.map((option, i) => (
                    <DropdownItem
                      key={option.key}
                      onClick={() => {
                        selectOptionAndCleanUp(option);
                      }}
                      style={{
                        background: i === selectedIndex ? "#e0e0e0" : "white",
                      }}
                    >
                      {option.value}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>,
              anchorElementRef.current
            )
          : null
      }
    />
  );
};
