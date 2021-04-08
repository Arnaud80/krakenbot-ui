// OHLC.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import OHCL from '../components/OHLC';
import {dataOHLCtoDataChart} from '../components/ohlcUtils';
import {ohlcAPIreturnSimple, apiReturnOHCL, ohlcDataChartSimple} from '../__mocks__/OHLC.mock'

it("Validate dataOHLCtoDataChart function", () => {
    
    expect(
      dataOHLCtoDataChart(ohlcAPIreturnSimple.result.XXBTZEUR)
    ).toStrictEqual(ohlcDataChartSimple);
});

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    HTMLCanvasElement.prototype.getContext = () => { 
        // return whatever getContext has to return
      };
});
  
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should render OHCL", () => {
    act(() => {
      render(<OHCL ohlcData={apiReturnOHCL.result.XXBTZEUR}/>, container);
    });
  
    expect(
      container.querySelector("[data-testid='ohcl']")
    ).toBeVisible();
});


it("should render OHCL without ohclData=null", () => {
    act(() => {
      render(<OHCL ohlcData={null}/>, container);
    });
  
    expect(
      container.querySelector("[data-testid='ohcl']").textContent
    ).toBe('...');
});