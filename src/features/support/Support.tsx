import Heading from "@components/heading/Heading";
import { Search } from "@components/search/Search";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";
import { RiRobot2Line } from "react-icons/ri";
import styled from "styled-components";

const StyledSupport = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const StyledHelpContainer = styled.div`
  width: 100%;
  min-height: 20rem;
  background-color: rgba(4, 170, 97, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
const StyledText = styled.span`
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 32px;
  color: rgba(40, 41, 63, 1);
`;
const StyledSupportContainer = styled.div`
  min-width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledFaqQuestioner = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledChatBot = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 69px;
  height: 69px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  box-shadow: 0px 1px 24px 0px rgba(0, 0, 0, 0.25);
`;
const StyledBotIconContainer = styled.div`
  width: 50%;
  height: 50%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  background-color: rgba(4, 170, 97, 1);
`;
export const Support = () => {
  const { control } = useForm();

  return (
    <StyledSupport>
      <StyledHelpContainer>
        <StyledText>Need some help?</StyledText>
        <div style={{ width: "40rem" }}>
          <Search onChange={() => console.log("")} />
        </div>
      </StyledHelpContainer>
      <StyledSupportContainer>
        <Heading as="h2" style={{ paddingBottom: "1.5rem" }}>
          FAQ
        </Heading>
        <StyledFaqQuestioner>
          <div>
            <SingleSelect
              name=""
              control={control}
              options={[{ label: "select", value: "selcet" }]}
            />
          </div>
          <div>
            <SingleSelect
              name=""
              control={control}
              options={[{ label: "select", value: "selcet" }]}
            />
          </div>
          <div>
            <SingleSelect
              name=""
              control={control}
              options={[{ label: "select", value: "selcet" }]}
            />
          </div>
          <div>
            <SingleSelect
              name=""
              control={control}
              options={[{ label: "select", value: "selcet" }]}
            />
          </div>
          <div>
            <SingleSelect
              name=""
              control={control}
              options={[{ label: "select", value: "selcet" }]}
            />
          </div>
        </StyledFaqQuestioner>
      </StyledSupportContainer>
      <StyledChatBot>
        <StyledBotIconContainer>
          <RiRobot2Line />
        </StyledBotIconContainer>
      </StyledChatBot>
    </StyledSupport>
  );
};
