import {BrowserRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import {BackButton} from "../../components/BackButton";
import {Navbar} from "../../components/Navbar";
import {NotFoundPage} from "../../pages/NotFound";
import {UserPage} from "../../pages/User";
import { Header } from "antd/es/layout/layout";

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
    const tree = renderer.create(<Navbar isLoading={false} />).toJSON();
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
  it("renders header correctly", () => {
    const tree = renderer
      .create(
        <Header />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
