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

const InputFieldValue = (label, helperText) => {
  return { label: label, helperText: helperText };
};

const values = [
  InputFieldValue("Gender", ""),
  InputFieldValue("Birth Year", ""),
  InputFieldValue("Skin Tone", ""),
  InputFieldValue("Skin Conditions", 'Separate by ","'),
];

function InputFields() {
  return (
    <div className="flex flex-col mt-10 justify-center items-center">
      <h1 className="text-black text-xl font-semibold mb-8">
        Patient Information
      </h1>
      <div className="w-1/4 flex flex-col items-center">
        <FormControl>
          {values.map((inputFieldValue) => (
            <>
              <FormLabel>{inputFieldValue.label}</FormLabel>
              <Input />
              {inputFieldValue.helperText !== "" && (
                <FormHelperText>{inputFieldValue.helperText}</FormHelperText>
              )}
            </>
          ))}
        </FormControl>
      </div>
    </div>
  );
}

export default InputFields;
