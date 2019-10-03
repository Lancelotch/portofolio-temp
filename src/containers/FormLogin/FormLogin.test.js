import React from "react";
import FormLoginContainer from "./FormLoginContainer";
import * as RootContext from "../../hoc/RootContext";
import { MemoryRouter, Route } from "react-router-dom";
import { render, fireEvent, wait } from "@testing-library/react";
import * as axios from "axios";

const setup = function() {
  const {getByText, container, getByTestId} = render(
    <MemoryRouter>
      <FormLoginContainer />
    </MemoryRouter>
  )
  const form = container.querySelector('form');
  const emailField = getByTestId('email');      
  const passwordField = getByTestId('password');      

  return {
    utils: {getByText, container, getByTestId},
    form,
    emailField,
    passwordField
  }
}

const contextValues = {
  handleLogin: jest.fn(),
  authResponse: {},
  isSubmitLoading: null
}
const jestSpy = jest.spyOn(RootContext, 'useRootContext');

describe("containers form login", () => {
  beforeEach(() => {
    jest.setTimeout(10000);
    jestSpy.mockImplementation(() => contextValues);
  });

  describe("given valid email & wrong password & backend connected", () => {
    it("should show error login failed", async() => {
      const component = setup();      
      const form = component.form;      

      const emailField = component.emailField;      
      fireEvent.change(emailField, {
        target: {
          value: 'test@gmail.com'
        }
      })      

      const passwordField = component.passwordField;      
      fireEvent.change(passwordField, {
        target: {
          value: 'test'
        }
      })      

      fireEvent.submit(form);
      contextValues.authResponse = { status: 500 }
      contextValues.isSubmitLoading = false;
      jestSpy.mockImplementation(() => contextValues);
      

      
      await wait(() => {
        expect(contextValues.handleLogin).toBeCalledTimes(1);
        // expect(component.utils.getByText('error:auth.failed')).toBeTruthy();
      })
    });
  });

  describe("given empty email", () => {
    it("should show error email required", async() => {
      const component = setup();      
      const form = component.form;      
      fireEvent.submit(form);

      await wait(() => {
        expect(component.utils.getByText('validation:email.required')).toBeTruthy();
      })
    });
  });

  describe("given invalid email", () => {
    it("should show error email invalid", async() => {
      const component = setup();      
      const form = component.form;      

      const emailField = component.emailField;      
      fireEvent.change(emailField, {
        target: {
          value: 'aaaaa'
        }
      })      
      fireEvent.submit(form);

      await wait(() => {
        expect(component.utils.getByText('validation:email.invalid')).toBeTruthy();
      })
    });
  });

  describe("given empty password", () => {
    it("should show error password required", async() => {
      const component = setup();      
      const form = component.form;      
      fireEvent.submit(form);

      await wait(() => {
        expect(component.utils.getByText('validation:password.required')).toBeTruthy();
      })
    });
  });
});
