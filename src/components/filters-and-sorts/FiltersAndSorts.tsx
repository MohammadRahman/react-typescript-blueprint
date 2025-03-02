import Button from "@components/button/Button";
import Form from "@components/form/Form";
import FormRowVertical from "@components/form/FormRowVertical";
import Input from "@components/form/Input";
import { SingleSelect } from "@components/select";
import SpinnerMini from "@components/spinner/SpinnerMini";
import { useEmailAccount } from "@features/mail-server/useEmailAccount";
import { FILTER_OPTIONS, ORDER_OPTIONS, SearchParamsProps } from "@interface/common/common";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const StyledFiltersAndSorts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  border: 1px solid var(--color-grey-100);
`;
const StyledRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;
const StyleFilterButton = styled.div`
  margin-top: 2.9rem;
`;

const FiltersAndSorts = () => {
  const { emailLists, isLoading } = useEmailAccount();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SearchParamsProps>({
    defaultValues: {
      currentPage: 0,
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

  function filterAndSortFormHandler(values: SearchParamsProps) {
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
          value: values.filterValue || "",
        },
      ],
      orders: [
        {
          propertyName: ordersPropertyName?.value || "",
          isDescending: ordersPropertyName?.isDescending ?? false,
        },
      ],
    };
    console.log("formatedFormProps", formatedValues);
    emailLists(formatedValues);
  }

  if (isLoading) return <SpinnerMini />;

  return (
    <StyledFiltersAndSorts>
      <Form style={{ all: "unset" }} onSubmit={handleSubmit(filterAndSortFormHandler)}>
        <StyledRow>
          <FormRowVertical label="Filter By" error={errors.filters?.message}>
            <SingleSelect name="filters" control={control} options={FILTER_OPTIONS} />
          </FormRowVertical>
          <FormRowVertical label="Filter Value" error={errors.filterValue?.message}>
            <Input placeholder="type here" {...register("filterValue")} />
          </FormRowVertical>
          <FormRowVertical label="Orders" error={errors.orders?.message}>
            <SingleSelect name="orders" control={control} options={ORDER_OPTIONS} />
          </FormRowVertical>
          <FormRowVertical label="Page Size" error={errors.pageSize?.message}>
            <Input
              style={{ width: "8rem" }}
              {...register("pageSize", {
                // valueAsNumber: true,
              })}
              type="number"
            />
          </FormRowVertical>
          <StyleFilterButton>
            <Button variation="outline">set</Button>
          </StyleFilterButton>
        </StyledRow>
      </Form>
    </StyledFiltersAndSorts>
  );
};

export default FiltersAndSorts;
