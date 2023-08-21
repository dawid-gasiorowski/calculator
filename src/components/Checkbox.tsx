import { useCallback } from "react";

interface Props {
  title: string;
  name: string;
  isChecked: boolean;
  onChange: (name: string, isChecked: boolean) => void;
}

const Checkbox = ({ title, name, isChecked, onChange }: Props) => {
  const onChangeHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(name, e.currentTarget.checked);
    },
    [name, onChange]
  );

  return (
    <label className="checkbox">
      <input type="checkbox" checked={isChecked} name={name} onChange={onChangeHandle} />
      <span className="is-inline-block mx-2">{title}</span>
    </label>
  );
};

export default Checkbox;
