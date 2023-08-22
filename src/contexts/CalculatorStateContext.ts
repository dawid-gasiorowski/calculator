import React from "react";
import { initialState, State } from "../store/state";

const CalculatorStateContext = React.createContext<State>(initialState);

export { CalculatorStateContext };
