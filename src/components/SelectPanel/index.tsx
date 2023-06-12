import { useState } from "react";

import style from "./styles.module.css";

type optionType = {
  fields: number;
  level: string;
};

type selectPropsType = {
  options: optionType[];
  setOption: (arg: number) => void;
  setIsGameStarted: (arg: boolean) => void;
  isGameStarted: boolean;
  endGame: () => void;
};

const SelectPanel = ({
  options,
  setOption,
  setIsGameStarted,
  isGameStarted,
  endGame,
}: selectPropsType) => {
  const [selectedOption, setSelectedOption] = useState(5);

  const onButtonClickHandler = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    const target = e.target as HTMLButtonElement;
    if (target.id === "start") {
      setOption(selectedOption);
      setIsGameStarted(true);
    } else if (target.id === "end") {
      endGame();
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
