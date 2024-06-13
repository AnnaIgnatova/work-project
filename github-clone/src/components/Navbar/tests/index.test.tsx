import {fireEvent, render, screen} from "@testing-library/react";
import { Navbar } from "..";

describe("Navbar actions", () => {
  beforeEach(() => {
    render(<Navbar isLoading={false} />);
  });

  it("type name in input", () => {
    const input: HTMLInputElement = screen.getByLabelText("name-input");
    fireEvent.change(input, {target: {value: "test name"}});
    expect(input.value).toBe("test name");
  });

  it("change followers count", () => {
    const input: HTMLInputElement = screen.getByLabelText("followers-input");
    fireEvent.change(input, {target: {value: "25"}});
    expect(input.value).toBe("25");
  });

  it("change created by date", () => {
    const input: HTMLInputElement = screen.getByLabelText("date-input");
    fireEvent.change(input, {target: {value: "2020-10-10"}});
    expect(input.value).toBe("2020-10-10");
  });
});
