import { IconContainer } from "@components/container/IconContainer";
import { Row } from "@components/row";
import { HiArrowLongLeft } from "react-icons/hi2";

interface FormHeaderProps {
  logo?: boolean;
  heading: string;
  style?: React.CSSProperties;
}
const FormHeader = ({ logo, heading, style }: FormHeaderProps) => {
  const content = logo ? "space-between" : "flex-start";
  return (
    <Row gap="md" justifycontent={content} style={style}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <IconContainer type="round">
          <HiArrowLongLeft />
        </IconContainer>
        <span>{heading}</span>
      </div>
      {logo && (
        <div>
          <img src="/images/logo/brand_white_bg.png" width={91} height={32} />
        </div>
      )}
    </Row>
  );
};

export default FormHeader;
