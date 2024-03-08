import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/Main";
import { NotFoundPage } from "./pages/NotFound";
import { Header } from "./components/Header";
import { UserPage } from "./pages/User";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:user" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
