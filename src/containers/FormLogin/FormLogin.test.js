import React from "react";
import FormLogin from "./index";
import * as RootContext from "../../hoc/RootContext";
import { MemoryRouter, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";

describe("containers form login", () => {
  describe("given empty email", () => {
    it("should show error email required", () => {
      const dispatch = () => {};
      const contextValues = {
        handleLogin: dispatch,
      }
      jest.spyOn(RootContext, 'useRootContext')
      .mockImplementation(() => contextValues);

      const {
        getByLabelText, getByTestId, getAllByAltText, findByTestId
      } = render(
        <MemoryRouter>
          <FormLogin />
        </MemoryRouter>
      );
      
      const email = getByTestId('email');
      expect(email.innerHtml).toBe("");
      // expect(wrapper.find('form').update().dive().find('has-error').length).toBe(2);;
      // expect(email.length).toBe(2);
      // expect(emailError.length).toBe(2);
    });
  });
  //TODO:RISET UNIT TEST
});
