import { HiChevronLeft, HiChevronRight, HiMiniPlusSmall } from "react-icons/hi2";
import styled from "styled-components";
import { MainNavigation } from "@components/main-navigation";
import { Logo } from "@components/logo";

const StyledSidebar = styled.aside`
  background-color: var(--color-blue-600);
  border-right: 1px solid var(--color-grey-100);
  position: relative;
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem;
  gap: 3.2rem;
`;
const CollapsedIcon = styled.aside`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  top: 0;
`;
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Logo collapse={collapse} />
        <MainNavigation collapse={collapse} />
      </div>
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
