// Balance.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Balance from '../components/Balance';
import {dataBalance, dataTradesHistory} from '../__mocks__/Balance.mock';

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});
  
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should render balance", () => {

    act(() => {
      render(<Balance balance={dataBalance} tradesHistory={dataTradesHistory} test='true'/>, container);
    });
  
    expect(
      container.querySelector("[data-testid='balance']")
    ).toBeVisible();

    expect(
        container.querySelector("[data-testid='totalBalance']").textContent
    ).toBe('98.9431621656 Euros');

    expect(
      container.querySelector("[data-testid='toggle0']").textContent
    ).toBe('Stellar Lumens (XXLM)');

    expect(
      container.querySelector("[data-testid='body0']").textContent
    ).toBe('50.00000000');

    expect(
      container.querySelector("[data-testid='toggle1']").textContent
    ).toBe('Bitcoin Cash (BCH)');

    expect(
      container.querySelector("[data-testid='body1']").textContent
    ).toBe('0.1603501800');
});
