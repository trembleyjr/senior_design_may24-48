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

const InputFieldValue = (label, helperText) => {
  return { label: label, helperText: helperText };
};

const values = [
  InputFieldValue("Gender", ""),
  InputFieldValue("Birth Year", ""),
  InputFieldValue("Skin Tone", ""),
];

function InputFields() {
  return (
    <div className="flex flex-col mt-auto justify-center items-center p-10">
      <h1 className="text-black text-xl font-semibold mb-8">
        Patient Information
      </h1>
      <div className="w-1/2 flex flex-col items-center">
        <div className="w-full">
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
        <SkinConditionSelection />
      </div>
    </div>
  );
}

export default InputFields;
