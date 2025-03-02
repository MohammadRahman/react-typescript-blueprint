import { CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

type LoadingProps = {
  loading: boolean;
};

export const Loader = ({ loading }: LoadingProps) => {
  return (
    <div style={{ height: "50vh" }}>
      <DotLoader
        color="var(--color-brand)"
        loading={loading}
        cssOverride={override}
        // size={30}
        // style={{ height: 10 }}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
