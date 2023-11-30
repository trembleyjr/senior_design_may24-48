import "./styles/App.css";
import Header from "./components/Header";
import { ChakraProvider, Button, Spinner } from "@chakra-ui/react";
import InputFields from "./components/InputFields";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const getPrediction = async () => {
    setIsLoading(true);

    const res = await fetch(awsTestUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    console.log(res);
    setIsLoading(false);
  };

  return (
    <div className="h-screen mx-auto">
      <Header />

      <main className="flex flex-col items-center">
        {isLoading && (
          <div className="mt-60">
            <Spinner size="xl" thickness="4px" />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="w-full">
              <InputFields />
            </div>
            <div className="mt-6">
              <Button onClick={getPrediction} colorScheme="red">
                View Prediction
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;

const awsTestUrl =
  "https://lryw2w5i7nr5ysubsumkcn4ssu0fprbu.lambda-url.us-east-1.on.aws/";
