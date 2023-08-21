import { useCallback } from "react";
import Checkbox from "./Checkbox";

interface CheckboxValue {
  value: string;
  title: string;
}

interface Props {
  availableValues: CheckboxValue[];
  checkedValues: string[];
  onChange: (checkedValues: string[]) => void;
}

const CheckboxList = ({ availableValues, checkedValues, onChange }: Props) => {
  const onChangeHandle = useCallback(
    (name: string, isChecked: boolean) => {
      const checkedValueSet = new Set<string>(checkedValues);
      if (isChecked) {
        checkedValueSet.add(name);
      } else {
        checkedValueSet.delete(name);
      }
      onChange(Array.from(checkedValueSet));
    },
    [checkedValues]
  );

  return (
    <>
      {availableValues?.map((checkboxValue) => (
        <div key={checkboxValue.value}>
          <Checkbox
            name={checkboxValue.value}
            isChecked={checkedValues.includes(checkboxValue.value)}
            title={checkboxValue.title}
            onChange={onChangeHandle}
          />
        </div>
      ))}
    </>
  );
};

export default CheckboxList;
