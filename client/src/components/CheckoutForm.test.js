import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import App from "../App";
import { act } from "react-dom/test-utils";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<App />);

  const { getByRole } = render(<CheckoutForm />);
  expect(getByRole("img")).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
  act(() => {
    render(<CheckoutForm />);
  });
  const firstName = screen.getByLabelText(/first name:/i);
  const lastName = screen.getByLabelText(/last name:/i);
  const address = screen.getByLabelText(/address:/i);
  const city = screen.getByLabelText(/city:/i);
  const state = screen.getByLabelText(/state:/i);
  const zip = screen.getByLabelText(/zip:/i);
  const checkout = screen.getByRole("button");

  fireEvent.change(firstName, { target: { value: "Sahar" } });
  fireEvent.change(lastName, { target: { value: "Jafari" } });
  fireEvent.change(address, { target: { value: "505 Ezy st" } });
  fireEvent.change(city, { target: { value: "San Francisco" } });
  fireEvent.change(state, { target: { value: "CA" } });
  fireEvent.change(zip, { target: { value: "12345" } });
  fireEvent.click(checkout);

  const success = await screen.findByText(
    /your new green friends will be shipped to:/i
  );
  expect(success).toBeTruthy();
});
