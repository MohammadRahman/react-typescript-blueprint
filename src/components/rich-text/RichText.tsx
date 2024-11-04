import { useState } from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";

const customModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
  ],
};

const StyledQuilEditor = styled(ReactQuill)`
  /* .ql-container {
    display: flex;
    flex-direction: column-reverse;
  } */
  .ql-editor {
    border-top: 1px solid;
    height: 230px;
    max-height: 400px;
    overflow: auto;
    background-color: var(--color-grey-100);
  }
`;

type RichTextProps = {
  name: string;
  control?: any;
};
export const RichText = ({ control, name }: RichTextProps) => {

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <StyledQuilEditor
            modules={customModules}
            theme="snow"
            value={field.value || ""}
            onChange={content => field.onChange(content)}
            placeholder="type here"
            style={{
              display: "flex",
              flexDirection: "column-reverse",
            }}
          />
        )}
      />
    </>
  );
};
