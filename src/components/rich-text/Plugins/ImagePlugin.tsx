import React, { useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createImageNode } from "../nodes/ImageNode";
import { $insertNodes } from "lexical";
import Button from "@components/button/Button";
import FileInput from "@components/form/FileInput";
import { Modal } from "@components/modal";
import Input from "@components/form/Input";

export default function ImagePlugin() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setURL] = useState("");
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

  const [editor] = useLexicalComposerContext();

  const onAddImage = () => {
    let src = "";
    if (url) src = url;
    if (file) src = URL.createObjectURL(file);

    editor.update(() => {
      const node = $createImageNode({ src, altText: "Dummy text" });
      $insertNodes([node]);
    });
    setFile(undefined);
    setURL("");
    setIsOpen(false);
  };

  return (
    <div>
      <Button aria-label="Add Image" size="small" onClick={() => setIsOpen(true)}>
        h
      </Button>
      <FileInput />
      {/* <input
        type="file"
        ref={inputRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) {
            setFile(file);
          }
          e.target.files = null;
        }}
      /> */}
      <Modal>
        <Modal.Open opens="image_button">
          <Button onClick={onAddImage}>Add image</Button>
        </Modal.Open>
        <Modal.Window name="image_button">
          <Input value={url} onChange={e => setURL(e.target.value)} placeholder="Add Image URL" />
          <Button onClick={() => inputRef?.current?.click()}>
            {file ? file.name : "Upload Image"}
          </Button>
        </Modal.Window>
      </Modal>
      {/* {isOpen && (
        <Modal
          title="Add Image"
          onClose={() => setIsOpen(false)}
          footer={
            <Button variant="ghost" isDisabled={!url && !file} onClick={onAddImage}>
              Add Image
            </Button>
          }
          isOpen={isOpen}
        >
          <Input value={url} onChange={e => setURL(e.target.value)} placeholder="Add Image URL" />
          <Button variant="ghost" mt={4} onClick={() => inputRef?.current?.click()}>
            {file ? file.name : "Upload Image"}
          </Button>
        </Modal>
      )} */}
    </div>
  );
}
