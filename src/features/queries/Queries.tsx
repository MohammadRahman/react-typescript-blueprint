import { Table } from "@components/table";
import { useState } from "react";
import styled from "styled-components";
import { QueryRow } from "./QueryRow";
import { getQueryMock } from "@mocks/data";
import Checkbox from "@components/form/CheckBox";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import { SingleSelect } from "@components/select";
import { useForm } from "react-hook-form";
import SQLQueryEditor from "@components/editor/MonacoSqlEditor";
import TestConnection from "@features/sources/TestConnection";
import Input from "@components/form/Input";
import Button from "@components/button/Button";
import { HiOutlineEye } from "react-icons/hi2";
import { useCreateQuery } from "./useCreateQuery";
import { v4 as uuidv4 } from 'uuid';

const StyledQueries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 8px;
`;
const StyledCheckBoxContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  display: flex;
  justify-content: flex-start;
  padding: 0px 1rem;
  align-items: center;
  border-radius: 8px;
  padding: 1rem;
  min-height: 9rem;
  max-height: auto;
  position: relative;
`;
const StyledCheckbox = styled.div<{ isChecked: boolean }>`
  position: absolute;
  top: ${({ isChecked }) => (isChecked ? "1rem" : "50%")};
  transform: translateY(-50%);
  transition: top 0.3s ease, transform 0.3s ease;
`;

const HiddenContent = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: ${({ isVisible }) => (isVisible? "5rem" : "50%")};
  left: 1rem;
  width: calc(100% - 2rem);
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: translateY(-50%);
  transition: top 0.3s ease, opacity 0.3s ease;
  z-index: 1;
`;
const StyledTextContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  background-color: 1px solid #e5e5e5;
  padding: 1rem 1.5rem;
`;

const sources = [
  {
    label: "source-1",
    value: "source-1"
  }
]

export const Queries = () => {

  const [showEditor, setShowEditor] = useState(false);
  const {createQuery} = useCreateQuery();

  const [query, setQuery] = useState("");
  const isDataSource = Boolean(false);
  const [dataSource, setDataSource] = useState(isDataSource);
  const isSQLQuery = Boolean(false);
  const [sqlQuery, setSqlQuery] = useState(isSQLQuery);

  const isDatabase = Boolean(false);
  const [databaseConnection, setDatabaseConnection] = useState(isDatabase);

  const rowData = getQueryMock();

  const {control, register, formState:{errors}, handleSubmit} = useForm();

  function submitHandler(values: any){
    const queryId = uuidv4();
    createQuery({
      version: 0,
      id: queryId,
      sourceId: uuidv4(),
      name: values.name,
      body: query
    })
    console.log({...values, query});
  }

  return (
    <StyledQueries>
      <StyledContainer>
        <span>&larr; New Query</span>
        <Form onSubmit={handleSubmit(submitHandler)}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
          <StyledCheckBoxContainer>
          <FormRowVertical label="Name" error={errors.name?.message}>
            <Input {...register("name")} style={{width: "30rem"}} placeholder="Type here..."/>
          </FormRowVertical>
          </StyledCheckBoxContainer>
        <StyledCheckBoxContainer>
          <FormRowVertical label="">
          <StyledCheckbox isChecked={dataSource}>
            <Checkbox
              id="dataSource"
              checked={dataSource}
              disabled={rowData.jobsPermission === 56}
              onChange={() => setDataSource(prev => !prev)}
            >
              <span>Data Source</span>
            </Checkbox>
            </StyledCheckbox>
            {dataSource && (
                 <HiddenContent isVisible={dataSource} style={{width: '30rem', paddingTop: '1rem', paddingBottom: '1rem', position: 'absolute'}}>
                    <SingleSelect name="dataSource" control={control} options={sources}/>
                </HiddenContent>
            )}            
            </FormRowVertical>
          </StyledCheckBoxContainer>
          <StyledCheckBoxContainer>
          <FormRowVertical>
          <StyledCheckbox isChecked={databaseConnection}>
            <Checkbox
              id="dataBaseConnection"
              checked={databaseConnection}
              disabled={rowData.jobsPermission === 56}
              onChange={() => setDatabaseConnection(prev => !prev)}
            >
              <span>Connection to Database</span>
            </Checkbox>
            </StyledCheckbox>
            { databaseConnection && (
              <HiddenContent isVisible={databaseConnection} style={{width: '30rem', paddingTop: '1rem', paddingBottom: '1rem'}}>
                  <TestConnection connectionString=""/> 
              </HiddenContent>
            )}
          </FormRowVertical>
          </StyledCheckBoxContainer>
          <StyledCheckBoxContainer style={{ gridColumn: "1 / -1", width:"50%"}}>
          <FormRowVertical label="">
           <Checkbox
              id="sqlQuery"
              checked={sqlQuery}
              disabled={rowData.jobsPermission === 56}
              onChange={() => {
                setSqlQuery(prev => !prev)
                setShowEditor(!showEditor)
                }}
            >
              <span>SQL query</span>
            </Checkbox>
            { sqlQuery && showEditor&&(
              <SQLQueryEditor 
              setShowEditor={setShowEditor} 
              query={query} 
              setQuery={setQuery}
              />
            )}
            { sqlQuery && !showEditor &&(
              <div style={{position: 'absolute', right: '1rem'}}>
                <HiOutlineEye type="button" onClick={()=> setShowEditor(true)}/>
              </div>
            )}
          </FormRowVertical>
          
          </StyledCheckBoxContainer>
          <div style={{gridColumn: "1 / -1",display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <Button>Cancel</Button>
              <Button>Save</Button>
          </div>
        </div>
      </Form>
        <StyledTextContainer>
          <h2>Show data preview</h2>
          <p style={{ paddingTop: "1rem" }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus ad reiciendis
            voluptates? Facere quae dignissimos magni, at unde doloremque aliquam voluptatum eius in
            culpa laboriosam dolores incidunt aspernatur nostrum reiciendis! Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Ex veniam atque architecto quis, molestias harum
            voluptate corporis quae dolores laudantium, exercitationem quidem necessitatibus vero
            excepturi aliquid repellendus, rerum recusandae vel!
          </p>
          <p style={{ paddingTop: "1rem" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur debitis deserunt a
            perferendis nobis minus dolor, natus maiores neque, sequi, facere exercitationem? Quia
            eos suscipit mollitia quod sapiente rem eaque.
          </p>
          <p style={{ paddingTop: "1rem" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit, beatae veritatis non
            harum delectus repellendus, aut nihil repellat repudiandae, consectetur et. Non omnis
            quidem delectus architecto, at ullam error eum? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eos reiciendis iusto incidunt, praesentium, saepe blanditiis
            repudiandae amet tempora et necessitatibus nesciunt id quidem provident, ullam
            laboriosam facere cupiditate laborum odit.
          </p>
        </StyledTextContainer>
      </StyledContainer>
      <StyledContainer>
        <Table columns="2fr 2fr 2fr 1fr">
          <Table.Header>
            <div>Sources</div>
            <div>SQL Query</div>
            <div>Connection to Database</div>
            <div>Action</div>
          </Table.Header>
          <Table.Body data={rowData} render={(el: any) => <QueryRow key={el.id} rowData={el} />} />
        </Table>
      </StyledContainer>
    </StyledQueries>
  );
};
