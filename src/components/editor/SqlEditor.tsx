import Button from "@components/button/Button";
import { Container } from "@components/container/Container";
import FormRowVertical from "@components/form/FormRowVertical";
import TextareaComponent from "@components/form/TextArea";
import FormHeader from "@components/header/FormHeader";
import { useEffect, useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import {
  EditorFooter,
  StyledIcons,
  StyledMark,
  StyledQuery,
  StyledQueryResult,
} from "./sqlEditor.styles";
import { useQueryResult } from "@features/queries/useQueryResult";
import { useQueryData } from "@features/queries/useQueryData";
import { usequeryData } from "@context/QueryContext";
import QueryResult from "./QueryResult";
import EditorHeader from "./EditorHeader";

type SqlEditorProps = {
  width: string;
  height: string;
  sourceId: string;
  setShowEditor: (type: boolean) => void;
  queryVal: any;
  setQueryVal: any;
  register: any;
  setValue: any;
  watch: any;
};
const SqlEditor = ({
  width = "600px",
  height = "400px",
  sourceId,
  setShowEditor,
  queryVal,
  setQueryVal,

  setValue,
  watch,
}: SqlEditorProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRunQuery, setIsRunQuery] = useState(false);

  const { getQueryResult } = useQueryResult();
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

  function submitQuery() {
    const queryPayload = {
      sourceId,
      queryScript: queryVal,
    };
    setIsRunQuery(true);
    getQueryResult(queryPayload);
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
      <EditorHeader elementRef={elementRef} setShowEditor={setShowEditor} />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100% - 80px)",
          border: "1px solid var(--color-grey-20)",
        }}
      >
        <StyledQuery
          isQueryRun={isRunQuery}
          style={{ height: `${isRunQuery} ? '50%': 100%`, overflow: "scroll" }}
        >
          <FormHeader heading="Write Your Query" />
          <Container style={{ paddingLeft: "2rem" }}>
            <TextareaComponent
              isFullScreen={isFullScreen}
              highlightingWord={watchValue.body}
              value={queryVal}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setQueryVal(e.target.value);
                setValue("body", e.target.value);
              }}
            />
          </Container>
        </StyledQuery>
        {isRunQuery && <QueryResult />}
      </Container>
      <EditorFooter>
        <div style={{ float: "right" }}>
          <Button type="button" variation="outlinePrimary" onClick={() => setShowEditor(false)}>
            save
          </Button>
        </div>
        <div style={{ float: "right" }}>
          <Button type="button" variation="outlinePrimary" onClick={submitQuery}>
            run
          </Button>
        </div>
      </EditorFooter>
    </Container>
  );
};

export default SqlEditor;
