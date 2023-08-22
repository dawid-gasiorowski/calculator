import React from "react";
import { Actions } from "../store/actions";

type Dispatch = React.Dispatch<Actions>;

const CalculatorDispatchContext = React.createContext<Dispatch>({} as Dispatch);

export { CalculatorDispatchContext };
