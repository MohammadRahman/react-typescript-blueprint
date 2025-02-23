import Button from "@components/button/Button";
import { Container } from "@components/container/Container";
import FormRowVertical from "@components/form/FormRowVertical";
import TextareaComponent from "@components/form/TextArea";
import FormHeader from "@components/header/FormHeader";
import { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import {
  EditorFooter,
  EditorHeader,
  StyledIcons,
  StyledMark,
  StyledQuery,
  StyledQueryResult,
} from "./sqlEditor.styles";

type SqlEditorProps = {
  width: string;
  height: string;
  sourceId: string;
  setShowEditor: (type: boolean) => void;
  setQuery: any;
  register: any;
  setValue: any;
  watch: any;
};
const SqlEditor = ({
  width = "600px",
  height = "400px",
  sourceId,
  setShowEditor,
  setQuery,
  setValue,
  watch,
}: SqlEditorProps) => {
  const [queryVal, setQueryval] = useState("");
  const elementRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRunQuery, setIsRunQuery] = useState(false);

  const watchValue = watch();

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (elementRef.current) {
        elementRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enable full-screen mode:", err);
        });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  function submitQuery(values: any) {
    setIsRunQuery(true);
  }

  return (
    <Container
      ref={elementRef}
      style={{
        width,
        height,
        backgroundColor: "var(--color-white)",
        border: "1px solid var(--color-grey-100)",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      <EditorHeader>
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
      </EditorHeader>
      <Container
        style={{
          display: "flex",
          height: "calc(100% - 80px)",
          border: "1px solid var(--color-grey-20)",
        }}
      >
        <StyledQuery isQueryRun={isRunQuery}>
          <FormHeader heading="Write Your Query" />
          <ul
            style={{
              position: "absolute",
              left: "0",
              width: "2rem",
              height: isFullScreen ? "100%" : "80%",
              borderRight: "1px solid var(--color-grey-20)",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "0.5rem",
              overflowY: "auto",
            }}
          >
            {Array.from({ length: 100 }, (_, idx) => idx + 1).map(num => (
              <li>{num}</li>
            ))}
          </ul>
          <Container style={{ paddingLeft: "2rem", height: "100%" }}>
            <FormRowVertical error={""}>
              <TextareaComponent
                isFullScreen={isFullScreen}
                highlightingWord={watchValue.body}
                // setValue={(newValue: string) => setQuery(newValue)}
                value={queryVal}
                // onChange={(e: any) => setQueryval(e.target.value)}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setQueryval(e.target.value);
                  setValue("body", e.target.value);
                  setQuery(queryVal);
                }}
              />
            </FormRowVertical>
          </Container>
        </StyledQuery>
        {isRunQuery && (
          <StyledQueryResult>
            <FormHeader heading="Query Result" />
          </StyledQueryResult>
        )}
      </Container>
      <EditorFooter>
        <div style={{ float: "right" }}>
          <Button variation="outlinePrimary">save</Button>
        </div>
        <div style={{ float: "right" }}>
          <Button type="button" variation="outlinePrimary" onClick={() => submitQuery(queryVal)}>
            run
          </Button>
        </div>
      </EditorFooter>
    </Container>
  );
};

export default SqlEditor;
