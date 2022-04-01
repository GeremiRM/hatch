import { fireEvent, render, screen } from "@testing-library/react";
import { Converter } from "..";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

const MockConverter = () => (
  <BrowserRouter>
    <Converter />
  </BrowserRouter>
);

const MockAmount = 10;
const MockConvertFrom = "USD";
const MockConvertTo = "EUR";

const MockExchange = 0.5;

describe("Converter", () => {
  describe("When submitting the form", () => {
    it("should make the conversion and display the values", async () => {
      const promise = Promise.resolve();
      const spy = jest.spyOn(Storage.prototype, "setItem");

      render(<MockConverter />);
      const input = screen.getByLabelText("Amount") as HTMLInputElement;
      const form = screen.getByTestId("form");
      const [selectFrom, selectTo] = screen.getAllByRole(
        "combobox"
      ) as HTMLSelectElement[];
      const displayFrom = screen.getByTestId("displayFrom");
      const displayTo = screen.getByTestId("displayTo");

      fireEvent.change(input, { target: { value: MockAmount } });

      fireEvent.submit(form, {
        target: {
          amount: { value: MockAmount },
          convertFrom: { value: MockConvertFrom },
          convertTo: { value: MockConvertTo },
        },
      });

      expect(input).toHaveValue(MockAmount);

      await act(() => promise);

      expect(spy).toHaveBeenCalled();

      expect(displayFrom).toHaveTextContent(
        `${input.value} ${selectFrom.value} =`
      );

      expect(displayTo).toHaveTextContent(
        `${MockAmount * MockExchange} ${selectTo.value}`
      );
    });
  });
});
