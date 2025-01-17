import { HiChevronLeft, HiChevronRight, HiMiniPlusSmall } from "react-icons/hi2";
import { MainNavigation } from "@components/main-navigation";
import { Logo } from "@components/logo";
import { CollapsedIcon, StyledSidebar } from "./sidebar.styles";
import { Row } from "@components/row";

interface SidebarProps {
  setCollapsed: any;
  collapse: boolean;
}
export const Sidebar = ({ collapse, setCollapsed }: SidebarProps) => {
  return (
    <StyledSidebar>
      <CollapsedIcon onClick={() => setCollapsed((prev: boolean) => !prev)}>
        {collapse ? <HiChevronLeft /> : <HiChevronRight />}
      </CollapsedIcon>
      <Row type="vertical" gap="xl">
        <Logo collapse={collapse} />
        <MainNavigation collapse={collapse} />
      </Row>
      <div
        style={{
          width: "100%",
          height: "133px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          style={{
            outline: "none",
            border: "none",
            width: "100%",
            height: "85px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            padding: "16px 24px 16px 24px",
            alignItems: "center",
            backgroundColor: "#04AA61",
            gap: "1.2rem",
          }}
        >
          <span
            style={{
              width: "25px",
              height: "25px",
              borderRadius: "500%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00FE87",
            }}
          >
            <HiMiniPlusSmall />
          </span>
          <p style={{ color: "white" }}> Create new Job</p>
        </button>
      </div>
    </StyledSidebar>
  );
};
