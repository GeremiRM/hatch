import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Form } from "..";
import { DF_CONVERT_FROM, DF_CONVERT_TO } from "../../../../constants";
import { Currency } from "../../../../types/Currencies";

const onSubmit = jest.fn();

const newMockFrom: Currency = "EUR";
const newMockTo: Currency = "CHF";

const MockForm = () => (
  <BrowserRouter>
    <Form
      dfConvertFrom={DF_CONVERT_FROM}
      dfConvertTo={DF_CONVERT_TO}
      onSubmit={onSubmit}
    />
  </BrowserRouter>
);

describe("form", () => {
  it("should switch the currencies values when clicking on switcher", async () => {
    render(<MockForm />);
    const [selectTo, selectFrom] = screen.getAllByRole(
      "combobox"
    ) as HTMLSelectElement[];
    const switcher = screen.getByTestId("switcher");

    const oldSelectTo = selectTo.value;
    const oldSelectFrom = selectFrom.value;

    fireEvent.click(switcher);

    expect(selectFrom.value).toBe(oldSelectTo);
    expect(selectTo.value).toBe(oldSelectFrom);
  });

  it("should change the selected currency", async () => {
    render(<MockForm />);

    const [selectTo, selectFrom] = screen.getAllByRole(
      "combobox"
    ) as HTMLSelectElement[];

    fireEvent.change(selectFrom, { target: { value: newMockFrom } });
    fireEvent.change(selectTo, { target: { value: newMockTo } });

    expect(selectFrom.value).toBe(newMockFrom);
    expect(selectTo.value).toBe(newMockTo);
  });
});
