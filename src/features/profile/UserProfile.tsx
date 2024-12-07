import Button from "@components/button/Button";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { SingleSelect } from "@components/select";
import { Table } from "@components/table";
import { HiOutlinePencil } from "react-icons/hi2";
import styled from "styled-components";
import { ProfileRow } from "./ProfileRow";
import { permissionDataMocks } from "@mocks/data";
import ButtonGroup from "@components/button-group/ButtonGroup";
import { useForm } from "react-hook-form";

const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ProfileContainer = styled.div`
  width: 49%;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  background-color: white;
  border-radius: 8px;
`;
const StyledProfileData = styled.div`
  width: 49%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 8px;
`;
const StyledProfileImage = styled.div`
  width: 49%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const StyledIcon = styled.div`
  bottom: 35px;
  right: 25px;
  position: absolute;
  width: 41px;
  height: 41px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #04aa61;
  color: var(--color-white);
  box-shadow: 0px 0px 21px 3px rgba(4, 170, 97, 1);
`;
const StyledSecurityDetails = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  width: 100%;
`;
const StyledButtonGroup = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
const StyledPermissionTable = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 8px;
`;
const options = [
  {
    label: "country",
    value: "1",
  },
];
export const UserProfile = () => {
  const userData = permissionDataMocks();
  const imageUrl = "/images/profile/profile-avatar.png";
  const { control } = useForm();
  return (
    <StyledProfile>
      <StyledContainer>
        <ProfileContainer>
          <StyledProfileData>
            <FormRowVertical label="Name">
              <Input placeholder="Type here" />
            </FormRowVertical>
            <FormRowVertical label="Email">
              <Input placeholder="Type here" />
            </FormRowVertical>
            <FormRowVertical label="Country">
              <SingleSelect name="" control={control} options={options} />
            </FormRowVertical>
          </StyledProfileData>
          <StyledProfileImage>
            <div
              style={{
                backgroundImage: `url(${imageUrl})`,
                width: "251px",
                height: "251px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                borderRadius: "16px",
              }}
            />
            <StyledIcon>
              <HiOutlinePencil />
            </StyledIcon>
          </StyledProfileImage>
        </ProfileContainer>
        <ProfileContainer>
          <StyledSecurityDetails>
            <FormRowVertical label="Old Password">
              <Input placeholder="Type here" />
            </FormRowVertical>
            <FormRowVertical label="New Password">
              <Input placeholder="Type here" />
            </FormRowVertical>
            <FormRowVertical label="Retype Password">
              <Input placeholder="Type here" />
            </FormRowVertical>
            <StyledButtonGroup>
              <Button variation="outlinePrimary">Cancel</Button>
              <Button variation="primary">Save Changes</Button>
            </StyledButtonGroup>
          </StyledSecurityDetails>
        </ProfileContainer>
      </StyledContainer>
      <StyledPermissionTable>
        <Table columns="2fr 2fr 2fr 2fr">
          <Table.Header>
            <div>Information</div>
            <div>View</div>
            <div>Edit</div>
            <div>Delete</div>
          </Table.Header>
          <Table.Body
            data={userData}
            render={(el: any) => <ProfileRow key={el.id} rowData={el} />}
          />
          <ButtonGroup style={{ justifyContent: "flex-end" }}>
            <Button variation="outlinePrimary">Cancel</Button>
            <Button variation="primary">Save Changes</Button>
          </ButtonGroup>
        </Table>
      </StyledPermissionTable>
    </StyledProfile>
  );
};
