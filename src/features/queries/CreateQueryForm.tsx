import Form from '@components/form/Form'
import { HiddenContent, StyledButton, StyledCheckbox, StyledCheckBoxContainer } from './query.styles'
import FormRowVertical from '@components/form/FormRowVertical'
import Input from '@components/form/Input'
import Checkbox from '@components/form/CheckBox'
import { SingleSelect } from '@components/select'
import TestConnection from '@features/sources/TestConnection'
import SQLQueryEditor from '@components/editor/MonacoSqlEditor'
import { HiOutlineEye } from 'react-icons/hi2'
import Button from '@components/button/Button'
import { useForm } from 'react-hook-form'
import { useCreateQuery } from './useCreateQuery'
import {v4 as uuidv4} from 'uuid';
import { useState } from 'react'
import { useUpdateQuery } from './useUpdateQuery'
import { QueryPayload } from '@apis/query'


const sources = [
    {
      label: "source-1",
      value: "source-1"
    }
  ]
  export type CreateQueryFormProps = {
    formData?: {
        version?: number; 
        id?: string;
        name?: string;
        body?:string;
        sourceId?: string;
    };
    onCloseModal?:()=> void;
}
const CreateQueryForm = ({formData = {}, onCloseModal}: CreateQueryFormProps) => {

    const {id, ...otherProps} = formData;
    const isUpdateSession = Boolean(id)
    const { updateQueryData, isUpdating } = useUpdateQuery();
    const [query, setQuery] = useState(isUpdateSession ?formData.body : "");
    
    const [dataSource, setDataSource] = useState(!!formData.sourceId);
  const [databaseConnection, setDatabaseConnection] = useState(false);
  const [sqlQuery, setSqlQuery] = useState(!!formData.body);
  const [showEditor, setShowEditor] = useState(false);
    
    const {createQuery} = useCreateQuery();



    const {control, reset, register, formState:{errors}, handleSubmit} = useForm({
        defaultValues: isUpdateSession ? formData : {}
    });
  
    function clearFields(){
        reset();
        setDataSource(false);
        setDatabaseConnection(false);
        setSqlQuery(false);
        setQuery("");
        onCloseModal?.()
      }

    function submitHandler(values: CreateQueryFormProps['formData']){
        const queryId = uuidv4();
        const formatedUpdatePayload: QueryPayload = {
          version: 0,
          id: formData.id || "",
          name: values?.name || "",
          sourceId: "85a96352-2648-4d83-ad15-7a7a375ba3cd",
          body: values?.body || "",
        }
        if(isUpdateSession){
          updateQueryData(formatedUpdatePayload, {
            onSuccess: ()=>{
              clearFields();
            }
          })
        }else{
          createQuery({
            version: 0,
            id: queryId,
            sourceId: "85a96352-2648-4d83-ad15-7a7a375ba3cd",
            name: values?.name,
            body: query
          }, {
            onSuccess: ()=> {
              clearFields();
            }
          })
        }
        
      }

    return (
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
            //   disabled={rowData.jobsPermission === 56}
              onChange={() => setDataSource(prev => !prev)}
            >
              <span>Data Source</span>
            </Checkbox>
            </StyledCheckbox>
            {dataSource && (
                 <HiddenContent isVisible={dataSource || isUpdateSession} style={{ paddingTop: '1rem', paddingBottom: '1rem', position: 'absolute'}}>
                    <SingleSelect name="sourceId" control={control} options={sources}/>
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
            //   disabled={rowData.jobsPermission === 56}
              onChange={() => setDatabaseConnection(prev => !prev)}
            >
              <span>Connection to Database</span>
            </Checkbox>
            </StyledCheckbox>
            { databaseConnection && (
              <HiddenContent isVisible={databaseConnection} style={{ paddingTop: '1rem', paddingBottom: '1rem'}}>
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
              onChange={() => {
                setSqlQuery(prev => !prev)
                setShowEditor(!showEditor)
                // setShowEditor(false)
                }}
            >
              <span>SQL query</span>
            </Checkbox>
            {sqlQuery && (
            <>
              {!showEditor && (
                <div style={{ position: "absolute", right: "1rem" }}>
                  <HiOutlineEye
                    type="button"
                    onClick={() => setShowEditor(true)} // Show editor on click
                    style={{ cursor: "pointer" }}
                  />
                </div>
              )}
               {showEditor && (
                <SQLQueryEditor
                  setShowEditor={setShowEditor}
                  query={query || ""}
                  setQuery={setQuery}
                />
              )}
              </>
            )}
          </FormRowVertical>
          
          </StyledCheckBoxContainer>
          <StyledButton>
              <Button type="button" onClick={clearFields}>Cancel</Button>
              <Button>Save</Button>
          </StyledButton>
        </div>
      </Form>
  )
}

export default CreateQueryForm;

 {/* { (sqlQuery && showEditor)&&(
              <SQLQueryEditor 
              setShowEditor={setShowEditor} 
              query={query} 
              setQuery={setQuery}
              />
            )} */}

{/* { (sqlQuery && !showEditor) &&(
              <div style={{position: 'absolute', right: '1rem'}}>
                <HiOutlineEye type="button" onClick={()=> setShowEditor(true)}/>
              </div>
            )} */}