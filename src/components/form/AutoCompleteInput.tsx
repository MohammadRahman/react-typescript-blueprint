import React, { useState, useRef, useMemo, useCallback } from "react";
import styled, { css } from "styled-components";

type OptionalProp = {
  isCheckbox?: "true";
  bgc?: "true";
};

const Input = styled.input<OptionalProp>`
  ${props =>
    props.isCheckbox === "true" &&
    css`
      border: none !important;
      border-radius: 0 !important;
      border-top-right-radius: 8px !important;
      border-bottom-right-radius: 8px !important;

      &:focus,
      &:active {
        border: none !important;
        outline: none;
      }
    `}
  border: 1px solid var(--color-grey-10);
  border-radius: 6px;
  padding: 1rem 1.5rem;
  ${props =>
    props.bgc === "true" &&
    css`
      background-color: var(--color-grey-20);
    `}
  width: 100%;
  height: 4.5rem;
`;

const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 150px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const InputWithAutocomplete: React.FC<{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  bgc?: "true";
  fieldValues: string[];
}> = ({ value, onChange, placeholder, bgc, fieldValues }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [_, setDropdownOptions] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const firstOptions = ["Model"];

  // Memoize nestedOptions
  const nestedOptions = useMemo(() => {
    return {
      Model: fieldValues,
    };
  }, [fieldValues]);

  // Memoize dropdownOptions
  const dropdownOptions = useMemo(() => {
    if (value.includes("@Model.")) {
      return nestedOptions["Model"];
    } else if (value.includes("@")) {
      return firstOptions;
    }
    return [];
  }, [value, nestedOptions]);

  // Memoize handleInputChange
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      onChange(inputValue);

      const cursorPosition = e.target.selectionStart || 0;
      const textBeforeCursor = inputValue.slice(0, cursorPosition);

      // Detect "@" trigger
      const atIndex = textBeforeCursor.lastIndexOf("@");
      if (atIndex !== -1) {
        const dotIndex = textBeforeCursor.lastIndexOf(".");
        if (dotIndex === -1 || dotIndex < atIndex) {
          // Show first dropdown
          setShowDropdown(true);
          setDropdownOptions(firstOptions);
          setDropdownPosition({
            top: (inputRef.current?.offsetTop || 0) + 40,
            left: atIndex * 8,
          });
          return;
        }
      }

      // Detect "." trigger after "@Model"
      const modelIndex = textBeforeCursor.lastIndexOf("@Model");
      if (modelIndex !== -1) {
        const dotIndex = textBeforeCursor.lastIndexOf(".");
        if (dotIndex !== -1 && dotIndex > modelIndex) {
          // Show second dropdown
          setShowDropdown(true);
          setDropdownOptions(nestedOptions["Model"]);
          setDropdownPosition({
            top: (inputRef.current?.offsetTop || 0) + 40,
            left: dotIndex * 8,
          });
          return;
        }
      }
      setShowDropdown(false);
    },
    [onChange, nestedOptions]
  );

  // Memoize handleOptionSelect
  const handleOptionSelect = useCallback(
    (option: string) => {
      const inputValue = value;
      const cursorPosition = inputRef.current?.selectionStart || 0;
      const textBeforeCursor = inputValue.slice(0, cursorPosition);

      let newValue = "";
      if (textBeforeCursor.includes("@Model.")) {
        // Insert nested option after "."
        newValue = inputValue.replace(/@Model\.[^.]*$/, `@Model.${option}`);
      } else if (textBeforeCursor.includes("@")) {
        // Insert first option after "@"
        newValue = inputValue.replace(/@[^@]*$/, `@${option}`);
      }

      onChange(newValue);
      setShowDropdown(false);
    },
    [value, onChange]
  );

  // Memoize Dropdown component
  const MemoizedDropdown = useMemo(() => {
    return (
      <Dropdown
        style={{
          top: dropdownPosition.top,
          left: dropdownPosition.left,
        }}
      >
        {dropdownOptions.map(option => (
          <DropdownItem key={option} onClick={() => handleOptionSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </Dropdown>
    );
  }, [dropdownOptions, dropdownPosition, handleOptionSelect]);

  return (
    <div style={{ position: "relative" }}>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        bgc={bgc}
      />
      {showDropdown && MemoizedDropdown}
    </div>
  );
};

export default InputWithAutocomplete;
// import React, { useState, useRef, memo, useMemo } from "react";
// import styled, { css } from "styled-components";

// type OptionalProp = {
//   isCheckbox?: "true";
//   bgc?: "true";
// };

// const Input = styled.input<OptionalProp>`
//   ${props =>
//     props.isCheckbox === "true" &&
//     css`
//       border: none !important;
//       border-radius: 0 !important;
//       border-top-right-radius: 8px !important;
//       border-bottom-right-radius: 8px !important;

//       &:focus,
//       &:active {
//         border: none !important;
//         outline: none;
//       }
//     `}
//   border: 1px solid var(--color-grey-10);
//   border-radius: 6px;
//   padding: 1rem 1.5rem;
//   ${props =>
//     props.bgc === "true" &&
//     css`
//       background-color: var(--color-grey-20);
//     `}
//   width: 100%;
//   height: 4.5rem;
// `;

// const Dropdown = styled.div`
//   position: absolute;
//   background-color: white;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//   z-index: 1000;
//   max-height: 150px;
//   overflow-y: auto;
// `;

// const DropdownItem = styled.div`
//   padding: 8px 12px;
//   cursor: pointer;
//   &:hover {
//     background-color: #f0f0f0;
//   }
// `;

// const InputWithAutocomplete: React.FC<{
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   bgc?: "true";
//   fieldValues: string[];
// }> = ({ value, onChange, placeholder, bgc, fieldValues }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [dropdownOptions, setDropdownOptions] = useState<string[]>([]);
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
//   const inputRef = useRef<HTMLInputElement>(null);

//   const firstOptions = ["Model"];

//   const nestedOptions = useMemo(() => {
//     return {
//       Model: fieldValues,
//     };
//   }, [fieldValues]);

//   // Handle input change
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const inputValue = e.target.value;
//     onChange(inputValue);

//     const cursorPosition = e.target.selectionStart || 0;
//     const textBeforeCursor = inputValue.slice(0, cursorPosition);

//     // Detect "@" trigger
//     const atIndex = textBeforeCursor.lastIndexOf("@");
//     if (atIndex !== -1) {
//       const dotIndex = textBeforeCursor.lastIndexOf(".");
//       if (dotIndex === -1 || dotIndex < atIndex) {
//         // Show first dropdown
//         setShowDropdown(true);
//         setDropdownOptions(firstOptions);
//         setDropdownPosition({
//           top: inputRef.current?.offsetTop || 0 + 40,
//           left: atIndex * 8,
//         });
//         return;
//       }
//     }

//     // Detect "." trigger after "@Model"
//     const modelIndex = textBeforeCursor.lastIndexOf("@Model");
//     if (modelIndex !== -1) {
//       const dotIndex = textBeforeCursor.lastIndexOf(".");
//       if (dotIndex !== -1 && dotIndex > modelIndex) {
//         // Show second dropdown
//         setShowDropdown(true);
//         setDropdownOptions(nestedOptions["Model"]);
//         setDropdownPosition({
//           top: inputRef.current?.offsetTop || 0 + 40,
//           left: dotIndex * 8,
//         });
//         return;
//       }
//     }
//     setShowDropdown(false);
//   };

//   // Handle dropdown option selection
//   const handleOptionSelect = (option: string) => {
//     const inputValue = value;
//     const cursorPosition = inputRef.current?.selectionStart || 0;
//     const textBeforeCursor = inputValue.slice(0, cursorPosition);

//     let newValue = "";
//     if (textBeforeCursor.includes("@Model.")) {
//       // Insert nested option after "."
//       newValue = inputValue.replace(/@Model\.[^.]*$/, `@Model.${option}`);
//     } else if (textBeforeCursor.includes("@")) {
//       // Insert first option after "@"
//       newValue = inputValue.replace(/@[^@]*$/, `@${option}`);
//     }

//     onChange(newValue);
//     setShowDropdown(false);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <Input
//         ref={inputRef}
//         value={value}
//         onChange={handleInputChange}
//         placeholder={placeholder}
//         bgc={bgc}
//       />
//       {showDropdown && (
//         <Dropdown
//           style={{
//             top: dropdownPosition.top,
//             left: dropdownPosition.left,
//           }}
//         >
//           {dropdownOptions.map(option => (
//             <DropdownItem key={option} onClick={() => handleOptionSelect(option)}>
//               {option}
//             </DropdownItem>
//           ))}
//         </Dropdown>
//       )}
//     </div>
//   );
// };

// export default InputWithAutocomplete;
