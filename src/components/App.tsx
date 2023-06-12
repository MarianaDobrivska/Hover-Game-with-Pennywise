import React, { useEffect, useRef, useState } from "react";

import CubesGrid from "./CubesGrid";
import SelectPanel from "./SelectPanel";
import Timer from "./Timer";

import happyClown from "../assets/happyclown.png";
import angryCown from "../assets/angryclown.png";
import youWin from "../assets/youwin.png";
import youLose from "../assets/youlose.png";

import style from "./style.module.css";

const options = [
  { fields: 5, level: "easy" },
  { fields: 10, level: "normal" },
  { fields: 15, level: "hard" },
];

function App() {
  const [option, setOption] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [cubes, setCubes] = useState([]);
  const [gameResult, setGameResult] = useState("");
  const listRef = useRef(null);
  const victory = gameResult === "win";
  const fail = gameResult === "fail";

  useEffect(() => {
    if (!isGameStarted) setCubes([]);
  }, [isGameStarted]);

  useEffect(() => {
    if (listRef.current) {
      (listRef.current as HTMLElement).scrollTop = (
        listRef.current as HTMLElement
      ).scrollHeight;
    }
  }, [cubes.length]);

  const endGame = () => {
    setIsGameStarted(false);
    setCubes([]);
    setOption(0);
    if (cubes.length === Math.pow(option, 2)) {
      setGameResult("win");
    } else {
      setGameResult("fail");
    }

    setTimeout(() => {
      setGameResult("");
    }, 10000);
  };

  return (
    <>
      {isGameStarted && <Timer duration={30} onTimeout={endGame} />}
      <div className={style.container}>
        <h1>let the hover game begin</h1>
        <div className={style.cubesContainer}>
          <div>
            <SelectPanel
              options={options}
              setOption={setOption}
              setIsGameStarted={setIsGameStarted}
              isGameStarted={isGameStarted}
              endGame={endGame}
            />
            <CubesGrid
              size={option}
              setCubes={setCubes}
              cubes={cubes}
              isOpen={isGameStarted}
              gameResult={gameResult}
            />
          </div>
          {isGameStarted ? (
            <div className={style.listWrapper}>
              <h2>hovered cubes</h2>
              <ul ref={listRef}>
                {cubes.map((cube: string) => (
                  <li key={cube}>{cube}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={style.listWrapper}>
              <h2>game rules</h2>
              <p>your task is to color all cubes within 30sec.</p>
              <ol ref={listRef}>
                <li>
                  select difficulty level from the dropdown and click "start"
                </li>
                <li>
                  start hovering over the cubes until all of them change color
                </li>
                <li>if time is up and unpainted cells remain - you lose</li>
                <li>go back to step 1</li>
              </ol>
            </div>
          )}
        </div>
      </div>
      {victory && (
        <div className={style.victoryImageWrapper}>
          <img src={happyClown} alt="happy clown" />
          <img src={youWin} alt="you win" />
        </div>
      )}
      {fail && (
        <div className={style.failImageWrapper}>
          <img src={angryCown} alt="angry clown" />
          <img src={youLose} alt="you lose" />
        </div>
      )}
    </>
  );
}

export default App;
