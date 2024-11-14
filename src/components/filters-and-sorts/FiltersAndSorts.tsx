import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { SingleSelect } from "@components/select";
import { useEmailAccount } from "@features/mail-server/useEmailAccount";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledFiltersAndSorts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
// const StyledContainer = styled.div`
//   width: 100%;
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   background-color: white;
//   border-radius: 8px;
// `;
const StyledRow = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`
const StyleFilterButton = styled.div`
    margin-top: 2.9rem;
    /* padding: ; */
`

type FilterOptions = {
    label: string;
    sign: 0;
    value: string;
  };
  
  const FILTER_OPTIONS = [
    { label: "email", sign: 0, value: "email" },
    { label: "type", sign: 0, value: "type" },
    { label: "displayName", sign: 0, value: "displayName" },
    { label: "imapEmail", sign: 0, value: "imapEmail" },
    { label: "smtpAddress", sign: 0, value: "smtpAddress" },
  ];
  
  type OrderOptions = {
    label: string;
    value: string;
    isDescending: boolean;
  };
  
  const ORDER_OPTIONS = [
    {
      label: "Email",
      value: "email",
      isDescending: true,
    },
    {
      label: "Type",
      value: "type",
      isDescending: true,
    },
    {
      label: "Name",
      value: "name",
      isDescending: true,
    },
    {
      label: "IMAP email",
      value: "imapEmail",
      isDescending: true,
    },
  ];
  
  export type SearchParamsProps = {
    currentPage?: number;
    filters?: FilterOptions[] | string;
    filterValue?: string;
    orders?: OrderOptions[] | string;
    pageSize?: number;
    logicalOperator?: number;
  };
const FiltersAndSorts = () => {
    
    const {emailLists, isLoading} = useEmailAccount();
    

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = !searchParams.get("page")
                        ? 0
                        : Number(searchParams.get("page"));

    const { register, handleSubmit, control, formState: { errors } } = useForm<SearchParamsProps>({
        defaultValues: {
          currentPage,
          pageSize: 0,
          logicalOperator: 1,
          filters: [
            {
              label: "",
              sign: 0,
              value: "",
            },
          ],
          filterValue: "",
          orders: [
            {
              label: "",
              value: "",
              isDescending: false,
            },
          ],
        },
      });

    function filterAndSortFormHandler(values: SearchParamsProps){
      searchParams.set("pageSize", String(values.pageSize || 10));
      searchParams.set("currentPage", String(currentPage));
      setSearchParams(searchParams);
      
        const filterPropertyName = FILTER_OPTIONS.find(val => val.value === (values.filters as string));
        const ordersPropertyName = ORDER_OPTIONS.find(opt => opt.value === (values.orders as string));
        
        const formatedValues = {
            currentPage: 0,
            pageSize: values.pageSize,
            logicalOperator: 1,
            filters: [
                {
                    propertyName: filterPropertyName?.label || "",
                    sign: 0,
                    value:values.filterValue || ""
                }
            ],
            orders: [
                {
                    propertyName: ordersPropertyName?.value || "",
                    isDescending: ordersPropertyName?.isDescending ?? false,
                }
            ],
        
        }
        console.log("formatedFormProps",formatedValues);
        emailLists(formatedValues)
    }

    if(isLoading) return <h1>Loading...</h1>

  return (
    <StyledFiltersAndSorts>  
    <Form style={{all: 'unset'}} onSubmit={handleSubmit(filterAndSortFormHandler)}>
        <StyledRow>
            <FormRowVertical label="Filter By" error={errors.filters?.message}>
                <SingleSelect name="filters" control={control} options={FILTER_OPTIONS}/>
            </FormRowVertical>
            <FormRowVertical label="Filter Value" error={errors.filterValue?.message}>
                <Input placeholder="type here" {...register("filterValue")}/>
            </FormRowVertical>
            <FormRowVertical label="Orders" error={errors.orders?.message}>
                <SingleSelect name="orders" control={control} options={ORDER_OPTIONS}/>
            </FormRowVertical>
            <FormRowVertical label="Page Size" error={errors.pageSize?.message}>
                <Input style={{width: '8rem'}} {...register("pageSize", {
                    // valueAsNumber: true,
                })} type="number"/>
            </FormRowVertical>
            <StyleFilterButton>
                <Button variation="outline">set</Button>
            </StyleFilterButton>
        </StyledRow>
    </Form>
    </StyledFiltersAndSorts>
  )
}

export default FiltersAndSorts;