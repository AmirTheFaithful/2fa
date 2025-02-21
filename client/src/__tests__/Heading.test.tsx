import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Heading from "../Heading";

describe("<Heading />", (): void => {
  test("First, should render 'Loading...!' text on the screen", async (): Promise<void> => {
    render(<Heading />);

    const heading = await screen.findByTestId("greeting");
    expect(heading).toBeDefined();
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe("Loading...");
  });
});
