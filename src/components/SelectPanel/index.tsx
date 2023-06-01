import { useState } from "react";

import style from "./styles.module.css";

type optionType = {
  fields: number;
  level: string;
};

type selectPropsType = {
  options: optionType[];
  setOption: (arg: number) => void;
  setIsOpen: (arg: boolean) => void;
};

const SelectPanel = ({ options, setOption, setIsOpen }: selectPropsType) => {
  const [selectedOption, setSelectedOption] = useState(5);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const onButtonClickHandler = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.id === "start") {
      setOption(selectedOption);
      setIsOpen(true);
      setIsGameStarted(true);
    } else {
      setIsOpen(false);
      setIsGameStarted(false);
    }
  };

  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    setSelectedOption(Number((e.target as HTMLSelectElement).value));
  };

  return (
    <div onClick={onButtonClickHandler} className={style.selectContainer}>
      <select name="select" onChange={handleChange}>
        {options.map(({ fields, level }) => (
          <option
            key={fields}
            value={fields}>{`${level}: ${fields} cubes`}</option>
        ))}
      </select>

      {isGameStarted ? (
        <button id="end">end game</button>
      ) : (
        <button id="start">start</button>
      )}
    </div>
  );
};

export default SelectPanel;
