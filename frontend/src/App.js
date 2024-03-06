import "./styles/App.css";
import Header from "./components/Header";
import { ChakraProvider, Button, Spinner } from "@chakra-ui/react";
import InputFields from "./components/InputFields";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [viewResult, setViewResult] = useState(false);
  const [prediciton, setPrediction] = useState("");

  const getPrediction = async () => {
    setIsLoading(true);

    const res = await fetch(awsTestUrl, {
      method: "GET",
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));

    setIsLoading(false);

    console.log(res);
    if (res) {
      setViewResult(true);
      setPrediction(res.body);
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

        {!isLoading && viewResult && (
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-black">Prediction:</h1>
            <p>{prediciton}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

const awsTestUrl =
  "https://lryw2w5i7nr5ysubsumkcn4ssu0fprbu.lambda-url.us-east-1.on.aws/";
