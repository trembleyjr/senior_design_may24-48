import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import SkinConditionSelection from "./SkinConditionSelection";

const InputFieldValue = (label, name) => {
  return { label: label, name: name };
};

const values = [
  InputFieldValue("Gender", "gender"),
  InputFieldValue("Birth Year", "birth_year"),
  InputFieldValue("Skin Tone", "skin_tone"),
];

function InputFields({ showSubmitError, handleInputChange, handleCheckboxChange }) {
  return (
    <div className="flex flex-col mt-auto justify-center items-center p-10">
       {showSubmitError && (
              <h1 className="my-3 text-red-600">Please fill all fields and select at least 1 condition</h1>
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
                <Input name={inputFieldValue.name} onChange={handleInputChange}/>
                {inputFieldValue.name !== "" && (
                  <FormHelperText></FormHelperText>
                  )}
              </div>
            ))}
          </FormControl>
        </div>
        <SkinConditionSelection handleCheckboxChange={handleCheckboxChange}/>
      </div>
    </div>
  );
}

export default InputFields;
