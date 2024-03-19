import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/Main";
import { NotFoundPage } from "./pages/NotFound";
import "./App.css";
import { CounterPage } from "./pages/Counter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
