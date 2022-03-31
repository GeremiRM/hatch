import { Header } from "./Components/Header";
import { Container } from "./Components/shared/container";
import "./App.scss";
import { Route, Routes } from "react-router";
import { Converter } from "./Components/Converter";
import { History } from "./Components/History";

function App() {
  return (
    <div className="app">
      <Container>
        <Header />
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
