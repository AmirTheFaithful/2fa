import { FC, ReactElement, useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

interface APIResponseBody<T> {
  payload: T;
  message: string;
}

const Heading: FC = (): ReactElement => {
  const [greeting, setGreeting] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect((): void => {
    const fetchGreeting = async (): Promise<void> => {
      try {
        console.log("fetchGreeting");

        const response: AxiosResponse<APIResponseBody<string>> =
          await axios.get("http://localhost:8000/api/");
        console.log(response.data.payload);
        const greeting: string = response.data.payload;

        setGreeting(greeting);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGreeting();
  }, []);

  let renderValue: string = "Nothing loaded";

  if (greeting) {
    renderValue = greeting;
  }

  if (error) {
    renderValue = error.message;
  }

  if (loading) {
    renderValue = "Loading...";
  }

  return <h1 data-testid="greeting">{renderValue}</h1>;
};

export default Heading;
