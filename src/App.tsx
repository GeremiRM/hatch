import { Header } from "./Header";
import { Container } from "./shared/container";
import "./App.scss";
import { Route, Routes } from "react-router";
import { Converter } from "./Converter";

function App() {
  return (
    <div className="app">
      <Container>
        <Header />
        <h1 className="app__title">Convert currencies in real-time.</h1>
        <Routes>
          <Route path="/" element={<Converter />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
