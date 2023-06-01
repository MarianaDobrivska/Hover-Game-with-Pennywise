import React, { useEffect, useRef, useState } from "react";

import CubesGrid from "./CubesGrid";
import SelectPanel from "./SelectPanel";

import style from "./style.module.css";

const options = [
  { fields: 5, level: "easy" },
  { fields: 10, level: "normal" },
  { fields: 15, level: "hard" },
];

function App() {
  const [option, setOption] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [cubes, setCubes] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    if (!isOpen) setCubes([]);
  }, [isOpen]);

  useEffect(() => {
    if (listRef.current) {
      (listRef.current as HTMLElement).scrollTop = (
        listRef.current as HTMLElement
      ).scrollHeight;
    }
  }, [cubes.length]);

  return (
    <>
      <div className={style.container}>
        <h1>let the hover game begin</h1>
        <div className={style.cubesContainer}>
          <div>
            <SelectPanel
              options={options}
              setOption={setOption}
              setIsOpen={setIsOpen}
            />
            <CubesGrid
              size={option}
              setCubes={setCubes}
              cubes={cubes}
              isOpen={isOpen}
            />
          </div>
          {isOpen ? (
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
                <li>Go back to step 1</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
