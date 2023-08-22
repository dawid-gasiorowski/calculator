import { useContext } from "react";
import { CalculatorStateContext } from "../contexts/CalculatorStateContext";

function useCalculatorState() {
  const state = useContext(CalculatorStateContext);

  return state;
}

export default useCalculatorState;
