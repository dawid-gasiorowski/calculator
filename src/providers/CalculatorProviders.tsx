import { ReactNode, useReducer } from "react";
import { CalculatorDispatchContext } from "../contexts/CalculatorDispatchContext";
import { CalculatorStateContext } from "../contexts/CalculatorStateContext";
import reducer from "../store/reducer";
import { initialState } from "../store/state";

interface Props {
  children: ReactNode;
}

const CalculatorProviders = ({ children }: Props) => {
  const [calculatorState, dispatch] = useReducer(reducer, initialState);

  return (
    <CalculatorStateContext.Provider value={calculatorState}>
      <CalculatorDispatchContext.Provider value={dispatch}>{children}</CalculatorDispatchContext.Provider>
    </CalculatorStateContext.Provider>
  );
};

export default CalculatorProviders;
