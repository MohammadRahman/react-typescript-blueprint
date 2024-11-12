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
    { label: "option1", sign: 0, value: "1" },
    { label: "option2", sign: 0, value: "2" },
    { label: "option3", sign: 0, value: "3" },
    { label: "option4", sign: 0, value: "4" },
    { label: "option5", sign: 0, value: "5" },
  ];
  
  type OrderOptions = {
    label: string;
    value: string;
    isDescending: boolean;
  };
  
  const ORDER_OPTIONS = [
    {
      label: "PropertyName",
      value: "3",
      isDescending: true,
    },
  ];
  
  export type SearchParamsProps = {
    currentPage?: number;
    filters?: FilterOptions[] | string;
    orders?: OrderOptions[] | string;
    pageSize?: number;
    logicalOperator?: number;
  };
const FiltersAndSorts = () => {
    
    const {emailLists, isLoading} = useEmailAccount()
    

    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = !searchParams.get("page")
                        ? 1
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

      const pageSizeValue = values.pageSize || 10;
      searchParams.set("pageSize", String(pageSizeValue));
      searchParams.set("page", String(currentPage));
      setSearchParams(searchParams);
      
        const filterPropertyName = FILTER_OPTIONS.find(val => val.value === (values.filters as string));
        const ordersPropertyName = ORDER_OPTIONS.find(opt => opt.value === (values.orders as string));
        
        const formatedValues = {
            currentPage: currentPage,
            pageSize: values.pageSize,
            logicalOperator: 1,
            filters: [
                {
                    propertyName: filterPropertyName?.label || "",
                    sign: filterPropertyName?.sign || 1,
                    value: filterPropertyName?.value || ""
                }
            ],
            orders: [
                {
                    propertyName: ordersPropertyName?.value || "",
                    isDescending: ordersPropertyName?.isDescending ?? false,
                }
            ],
        
        }
        console.log(formatedValues);
        emailLists(formatedValues)
    }

    if(isLoading) return <h1>Loading...</h1>

  return (
    <StyledFiltersAndSorts>  
    <Form style={{all: 'unset'}} onSubmit={handleSubmit(filterAndSortFormHandler)}>
        <StyledRow>
            <FormRowVertical label="Filters" error={errors.filters?.message}>
                <SingleSelect name="filters" control={control} options={FILTER_OPTIONS}/>
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