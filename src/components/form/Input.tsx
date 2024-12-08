import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  /* background-color: var(--color-grey-100); */
  border-radius: var(--border-radius-sm);
  padding: 1rem 1.5rem;
  /* box-shadow: var(--shadow-sm); */
`;

export default Input;

// import { useDisableAutocomplete } from "@hooks/useDisableAutoComplete";
// import styled from "styled-components";

// const StyledInput = styled.input`
//   border: 1px solid var(--color-grey-300);
//   border-radius: var(--border-radius-sm);
//   padding: 1rem 1.5rem;
// `;
// interface InputWithAutocompleteProps {
//   name?: string;
//   [key: string]: any;
// }

// const Input = ({ name, ...props }: InputWithAutocompleteProps) => {
//   const inputRef = useDisableAutocomplete(name);

//   return <StyledInput ref={inputRef} {...props} />;
// };

// export default Input;
