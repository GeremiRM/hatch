import { useFetchExchange } from "../hooks/useFetchExchange";
import { Form } from "./Form";

export const Converter: React.FC = () => {
  useFetchExchange();

  return (
    <div>
      <Form />
    </div>
  );
};
