import Button from "@components/button/Button"
import Form from "@components/form/Form"
import FormRowVertical from "@components/form/FormRowVertical"
import Input from "@components/form/Input"
import { SingleSelect } from "@components/select"
import { ContainerTwoElements, FormContainer, SytledFormButton, TypeParametersContainer } from "./source.styles"
import { useForm } from "react-hook-form"
import { useCreateSource } from "./useCreateSource"
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react"
import { DATA_SOURCE_TYPES } from "@constants/source"
import FileInput from "@components/form/FileInput"
import { useUpdateSourceAccount } from "./useUpdateSource"
import { useConnectionStr, useSourceType } from "@context/ConnectionStringContext"
import { useDebounce } from "./useHandleConnectionStr"
import { formatConnectionStr } from "@utils/helper"

type SourceFieldProps = {
    name: string;
    type: number;
    databaseName: string;
    host: string;
    port: number | undefined;
    username: string;
    password: string;
    file?: File;
  };
  type Database = {
    databaseName?: string;
    host?: string;
    port?: number | undefined;
    username?: string;
    password?: string;
    file?: File;
    version?: number;
  };
  
  export type SourceProps = {
    id?: string;
    name?: string;
    type?: number;
    database: Database;
  };

export type CreateSourceFormProps = {
    formData?: {
      version?: number;
        id?: string;
        name?: string;
        type?: number;
        database: Database;
      };
    onCloseModal?: ()=> void;
}
const CreateSourceForm = ({formData= {database: {}},onCloseModal }: CreateSourceFormProps) => {
    const [showOtherParameters, setShowOtherParameters] = useState(false);
    const { createSource, isCreating } = useCreateSource();
    const {updateSourceAccount, isUpdating} = useUpdateSourceAccount()
    
    const {setConnectionString} = useConnectionStr();

    const {id, ...otherProps} = formData;

    const mapToOneObject = {
        id: formData.id,
        name: formData.name,
        type: formData.type,
        ...formData.database
    }

    const isUpdateSession = Boolean(id)
    const {handleSubmit,control, formState: {errors}, reset, register,setValue, watch } = useForm<SourceFieldProps>({
        defaultValues: isUpdateSession ? mapToOneObject : {}
    })

const watchValue = watch();

function clearFields() {
  reset();
  setShowOtherParameters(false);
  localStorage.removeItem("SourceAccountValues");
}
    function handletypeForm(values: SourceFieldProps) {
        const randomId = uuidv4();
        const formatedPayload = {
          version: 0,
          id: randomId,
          name: values.name,
          type: values.type,
          database: {
            version: 0,
            sourceId: randomId,
            databaseName: values.databaseName,
            host: values.host,
            port: values.port,
            username: values.username,
            password: values.password,
          },
        };
        if(isUpdateSession && id){
          const updatePayload = {
            version: formData?.version,
            id: formData.id,
            name: values.name,
            type: values.type,
            database: {
              version: formData?.version,
              sourceId: formData.id,
              databaseName: values.databaseName,
              host: values.host,
              port: values.port,
              username: values.username,
              password: values.password,
            },
          }
          updateSourceAccount(updatePayload, {
            onSuccess: ()=> {
              onCloseModal?.();
            },
          })
        }else{
          createSource(formatedPayload, {
            onSuccess: () => {
              clearFields();
              // reset(), localStorage.removeItem("SourceAccountValues");
            },
            onError: () => {
              localStorage.setItem("SourceAccountValues", JSON.stringify(values)); // Save form values on error
            },
          });
        }
      }

const dbProps = {
  type: watchValue.type,
  databaseName: watchValue.databaseName || "",
  username: watchValue.username || "",
  password: watchValue.password || "",
  host: watchValue.host || "",
  port: Number(watchValue.port)

}
      useEffect(()=>{
        const str = formatConnectionStr({database: dbProps})
        setConnectionString(str)
      },[setConnectionString, dbProps])

      useEffect(() => {
        const storedValues = localStorage.getItem("SourceAccountValues");
        if (storedValues) {
          reset(JSON.parse(storedValues));
        }
        return () => localStorage.removeItem("SourceAccountValues");
      }, [reset]);

      useEffect(() => {
        if (watchValue.name && watchValue.type) {
          setShowOtherParameters(true);
        } else {
          setShowOtherParameters(false);
        }
        if (isUpdateSession) return;
        switch (watchValue.type) {
          case 1:
            setValue("host", "localhost");
            setValue("port", 5432);
            break;
          case 2:
            setValue("host", "localhost");
            setValue("port", undefined);
            break;
          case 3:
            setValue("host", "localhost");
            setValue("port", 3306);
            break;
          case 4:
            setValue("host", "localhost");
            setValue("port", 1433);
            break;
          case 5:
            setValue("host", "localhost");
            setValue("port", 27017);
            break;
          case 6:
            setValue("host", "localhost");
            setValue("port", 6379);
            break;
          case 7:
            setValue("host", "");
            setValue("port", undefined);
            break;
          default:
            setValue("host", "");
            setValue("port", undefined);
            break;
        }
      }, [watchValue.name, watchValue.type, isUpdateSession]);
      
  return (
    <Form onSubmit={handleSubmit(handletypeForm)} style={{ all: "unset" }}>
          <FormContainer>
            <ContainerTwoElements>
              <FormRowVertical label="" error={errors.name?.message}>
                <Input {...register("name")} placeholder="Name" />
              </FormRowVertical>
              <FormRowVertical label="" error={errors.type?.message}>
                <SingleSelect name="type" control={control} options={DATA_SOURCE_TYPES} />
              </FormRowVertical>
            </ContainerTwoElements>

            {showOtherParameters && watchValue.type !== 7 ? (
              <TypeParametersContainer>
                <FormRowVertical error={errors.username?.message}>
                  <Input placeholder="User Name" {...register("username")} />
                </FormRowVertical>
                <FormRowVertical error={errors.password?.message}>
                  <Input type="password" {...register("password")} />
                </FormRowVertical>
                <FormRowVertical error={errors.host?.message}>
                  <Input placeholder="Host" {...register("host")} />
                </FormRowVertical>
                <FormRowVertical error={errors.port?.message}>
                  <Input placeholder="Port" {...register("port")} />
                </FormRowVertical>
                <FormRowVertical error={errors.databaseName?.message}>
                  <Input placeholder="Database Name" {...register("databaseName")} />
                </FormRowVertical>
              </TypeParametersContainer>
            ) : showOtherParameters && watchValue.type === 7 ? (
              <div style={{ minWidth: "60px", maxWidth: "fit-content" }}>
                <FormRowVertical label="" error={errors.file?.message}>
                  <FileInput {...register("file")} />
                </FormRowVertical>
              </div>
            ) : null}

            {showOtherParameters && (
              <SytledFormButton>
                <Button type="button" variation="outlinePrimary" onClick={clearFields}>
                  Cancel
                </Button>

                <Button>Save</Button>
              </SytledFormButton>
            )}
          </FormContainer>
        </Form>
  )
}

export default CreateSourceForm