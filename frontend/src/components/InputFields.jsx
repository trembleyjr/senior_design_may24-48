import React from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select
} from "@chakra-ui/react";
import SkinConditionSelection from "./SkinConditionSelection";

const InputFieldValue = (label, name) => {
  return { label: label, name: name };
};

const DropdownFieldValue = (label, name, values) => {
  return { label: label, name: name, values: values};
};

const values = [
  InputFieldValue("Birth Year", "birth_year"),
];

const dropdownOptions = [
  DropdownFieldValue("Gender", "gender", ['Male', 'Female', 'Other', 'Undisclosed']),
  DropdownFieldValue("Skin Tone", "skin_tone", ['Brown', 'Dark', 'Fair', 'Light', 'Medium', 'Olive']),
  DropdownFieldValue('Fitzpatrick', 'fitzpatrick', ['Blank', 'Darker-White', 'White-Fair', 'Light-Pale-White', 'Brown', 'Dark-Brown-Black', 'Light-Brown'])
]

function InputFields({ showSubmitError, handleInputChange, handleCheckboxChange, errorMsg }) {
  return (
    <div className="flex flex-col mt-auto justify-center items-center p-10">
       {showSubmitError && (
              <h1 className="my-3 text-red-600">{errorMsg}</h1>
        )}
      <h1 className="text-black text-xl font-semibold mb-8">
        Patient Information
      </h1>
      <div className="w-1/2 flex flex-col items-center">
        <div className="w-full">
          <FormControl>
            {values.map((inputFieldValue, i) => (
              <div key={i}>
                <FormLabel>{inputFieldValue.label}</FormLabel>
                <Input type="number" name={inputFieldValue.name} onChange={handleInputChange}/>
                {inputFieldValue.name !== "" && (
                  <FormHelperText></FormHelperText>
                  )}
              </div>
            ))}
          </FormControl>
          {dropdownOptions.map((option, i) => {
            return (<div key={i} className="my-4">
              <FormLabel>{option.label}</FormLabel>
              <Select name={option.name} onChange={handleInputChange} placeholder="--">
                {option.values.map((value, i) => 
                <option value={value.toLowerCase()} key={i}>{value}</option>
                )}
              </Select>
            </div>)
          })}
        </div>
        <SkinConditionSelection handleCheckboxChange={handleCheckboxChange}/>
      </div>
    </div>
  );
}

export default InputFields;
