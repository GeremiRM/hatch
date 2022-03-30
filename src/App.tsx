import { Header } from "./Header/Header";
import { Container } from "./shared/container";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Container>
        <Header />
        <h1 className="app__title">Convert currencies in real-time.</h1>
      </Container>
    </div>
  );
}

export default App;
