import "./styles/App.css";
import Header from "./components/Header";
import { ChakraProvider, Button, Spinner } from "@chakra-ui/react";
import InputFields from "./components/InputFields";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [viewResult, setViewResult] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Data State
  const [formData, setFormData] = useState({
    gender: "",
    birth_year: "",
    skin_tone: "",
    fitzpatrick: "",
    skinConditions: [],
  });

  // Callback function to pass into InputFields for Text Box / Dropdown changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Callback function to pass into InputFields for Checkboxes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let updatedSkinConditions = [...formData.skinConditions];
    if (checked) {
      updatedSkinConditions.push(value);
    } else {
      updatedSkinConditions = updatedSkinConditions.filter(
        (condition) => condition !== value
      );
    }
    setFormData({
      ...formData,
      skinConditions: updatedSkinConditions,
    });
  };

  const validateFields = () => {
    // Check if all text fields are filled out
    const isTextFieldsFilled = Object.entries(formData)
      .filter(([key]) => key !== "skinConditions")
      .every(
        ([key, value]) => typeof value === "string" && value.trim() !== ""
      );
    if (!isTextFieldsFilled) {
      setErrorMsg("Please fill out all fields");
    }

    // Check if at least one skin condition is selected
    const isSkinConditionSelected = formData.skinConditions.length > 0;
    if (!isSkinConditionSelected) {
      setErrorMsg("Select at least one skin condition");
    }

    // Birth Year should be 4 digits
    const isBirthYearValid = formData.birth_year.length == 4;
    if (!isBirthYearValid) {
      setErrorMsg("Birth Year should be in the format YYYY");
    }

    return isTextFieldsFilled && isSkinConditionSelected && isBirthYearValid;
  };

  const getPrediction = async () => {
    const payload = {
      ...formData,
    };

    if (!validateFields()) {
      setShowSubmitError(true);
      return;
    }
    setErrorMsg("");

    console.log("JSON Payload ", JSON.stringify(payload));

    setIsLoading(true);

    const res = await fetch(awsTestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    setIsLoading(false);

    console.log(res);
    if (res) {
      setViewResult(true);
      const formattedPrediction = res.join(", ").replace(/,/g, ",\n");
      setPrediction(formattedPrediction);
    }
  };

  return (
    <div className="h-screen mx-auto">
      <Header />

      <main className="min-h-fit flex flex-col items-center justify-center ">
        {isLoading && (
          <div className="mt-60">
            <Spinner size="xl" thickness="4px" />
          </div>
        )}

        {!isLoading && !viewResult && (
          <>
            <div className="w-full flex flex-col items-center">
              <InputFields
                handleInputChange={handleInputChange}
                showSubmitError={showSubmitError}
                handleCheckboxChange={handleCheckboxChange}
                errorMsg={errorMsg}
              />
            </div>
            <div className="mt-6">
              <Button onClick={getPrediction} colorScheme="red">
                View Prediction
              </Button>
            </div>
          </>
        )}

        {!isLoading && viewResult && (
          <div className="flex flex-col items-center justify-center mt-8">
            <h1 className="text-3xl font-semibold text-black">
              Potential Allergens:
            </h1>
            <p className="text-xl font-thin text-gray-600">Ingredient Ids:</p>
            <div className="predictionBox">
              <p>
                {prediction != ""
                  ? prediction
                  : "No potential allergens identified"}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

const awsTestUrl =
  "https://qr2tj6xdwhkyzgum3c3vo7ijiy0kvpyb.lambda-url.us-east-2.on.aws/";
