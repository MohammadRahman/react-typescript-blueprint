import { Row } from "@components/row";
import { Table } from "@components/table";
import React, { useState } from "react";
import styled from "styled-components";
import { QueryRow } from "./QueryRow";
import { getQueryMock } from "@mocks/data";
import Checkbox from "@components/form/CheckBox";

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
  width: 32%;
  height: 5.5rem;
  border: 1px solid var(--color-grey-200);
  /* background-color: var(--color-grey-50); */
  display: flex;
  justify-content: flex-start;
  padding: 0px 1rem;
  align-items: center;
  border-radius: 8px;
`;
const StyledTextContainer = styled.div`
  border: 1px solid var(--color-grey-200);
  border-radius: 8px;
  background-color: 1px solid #e5e5e5;
  padding: 1rem 1.5rem;
`;
export const Queries = () => {
  const isDataSource = Boolean(false);
  const [dataSource, setDataSource] = useState(isDataSource);

  const isSQLQuery = Boolean(false);
  const [sqlQuery, setSqlQuery] = useState(isSQLQuery);

  const isDatabase = Boolean(false);
  const [databaseConnection, setDatabaseConnection] = useState(isDatabase);

  const rowData = getQueryMock();

  return (
    <StyledQueries>
      <StyledContainer>
        <span>&larr; New Database Connection</span>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StyledCheckBoxContainer>
            <Checkbox
              id="dataSource"
              checked={dataSource}
              disabled={rowData.jobsPermission === 56}
              onChange={() => setDataSource(prev => !prev)}
            >
              <span>Data Source</span>
            </Checkbox>
          </StyledCheckBoxContainer>
          <StyledCheckBoxContainer>
            <Checkbox
              id="sqlQuery"
              checked={sqlQuery}
              disabled={rowData.jobsPermission === 56}
              onChange={() => setSqlQuery(prev => !prev)}
            >
              <span>SQL query</span>
            </Checkbox>
          </StyledCheckBoxContainer>
          <StyledCheckBoxContainer>
            <Checkbox
              id="dataBaseConnection"
              checked={databaseConnection}
              disabled={rowData.jobsPermission === 56}
              onChange={() => setDatabaseConnection(prev => !prev)}
            >
              <span>Connection to Database</span>
            </Checkbox>
          </StyledCheckBoxContainer>
        </div>
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
          <Table.Body data={rowData} render={(el: any) => <QueryRow rowData={el} />} />
        </Table>
      </StyledContainer>
    </StyledQueries>
  );
};
