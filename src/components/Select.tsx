import { useCallback } from "react";

export interface SelectOption {
  value: string;
  title: string;
}
interface Props {
  options: SelectOption[];
  selectedOption: SelectOption | undefined;
  onSelectedOptionChange: (selectedOption: SelectOption | undefined) => void;
}

const Select = ({ options, onSelectedOptionChange }: Props) => {
  const onChangeHandle = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSelectedOptionChange(options.find((option) => option.value === e.currentTarget.value));
    },
    [options, onSelectedOptionChange]
  );

  return (
    <div className="select">
      <select onChange={onChangeHandle}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
