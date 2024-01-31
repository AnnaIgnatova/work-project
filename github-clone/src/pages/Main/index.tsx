import { Header } from "../../components/Header";
import { Navbar } from "../../components/Navbar";

import "./style.module.scss";

export const MainPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Navbar />
    </div>
  );
};
