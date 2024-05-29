import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import renderer from "react-test-renderer";
import { Navbar } from "./components/Navbar";
import { NotFoundPage } from "./pages/NotFound";
import { BackButton } from "./components/BackButton";
import { BrowserRouter } from "react-router-dom";
import { UserPage } from "./pages/User";

describe("snapshot tests", () => {
  it("renders back button correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <BackButton />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders navbar correctly", () => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders not found page correctly", () => {
    const tree = renderer.create(<NotFoundPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders user page correctly", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <UserPage />
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<App />", () => {
  // it("render header", () => {
  //   render(<App />);
  //   expect(screen.getByText(/GitHub Users/i)).toBeInTheDocument();
  // });
  // it("render filters", () => {
  //   render(<App />);
  //   expect(screen.getByText(/Filters/i)).toBeInTheDocument();
  // });
  it("type name in input", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByLabelText("name-input");
    fireEvent.change(input, { target: { value: "test name" } });
    expect(input.value).toBe("test name");
  });

  it("change followers count", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByLabelText("followers-input");
    fireEvent.change(input, { target: { value: "25" } });
    expect(input.value).toBe("25");
  });

  it("change created by date", () => {
    render(<App />);
    const input: HTMLInputElement = screen.getByLabelText("date-input");
    fireEvent.change(input, { target: { value: "2020-10-10" } });
    expect(input.value).toBe("2020-10-10");
  });
});
