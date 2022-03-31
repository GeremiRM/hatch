import { Header } from "./Components/Header";
import { Container } from "./Components/shared/container";
import "./App.scss";
import { Route, Routes } from "react-router";
import { Converter } from "./Components/Converter";
import { History } from "./Components/History";
import { useContext, useEffect } from "react";
import { useFetchExchange } from "./hooks/useFetchExchange";
import { Context } from "./state/Context";

function App() {
  const { conversionCurr } = useContext(Context);
  const { fetchExchangeRate } = useFetchExchange();

  useEffect(() => {
    fetchExchangeRate(conversionCurr.convertFrom, conversionCurr.convertTo);
  }, [conversionCurr.convertFrom, conversionCurr.convertTo, fetchExchangeRate]);

  return (
    <div className="app">
      <Container>
        <Header />
        <h1 className="app__title">Convert currencies in real-time.</h1>
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
