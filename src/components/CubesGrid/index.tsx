import { useEffect, useState } from "react";

import placeholder from "./assets/placeholder.gif";

import style from "./styles.module.css";

type gridPropsType = {
  size: number;
  setCubes: (arg: any) => void;
  cubes: String[];
  isOpen: boolean;
};

const CubesGrid = ({ size, setCubes, cubes, isOpen }: gridPropsType) => {
  const [activeCubes, setActiveCubes] = useState([] as string[]);

  useEffect(() => {
    if (!isOpen) setActiveCubes([]);
  }, [isOpen]);

  const handleCubeHover = (row: number, column: number, cubeKey: string) => {
    const location = `row ${row}, column ${column}`;
    if (cubes.indexOf(location) === -1) {
      setCubes((prev: any) => [...prev, location]);
      setActiveCubes((prev) => [...prev, cubeKey]);
    } else {
      setCubes((prev: any) => prev.filter((el: any) => el !== location));
      setActiveCubes((prev: any) => prev.filter((el: any) => el !== cubeKey));
    }
  };

  const renderCubes = () => {
    const cubes = [];

    for (let row = 1; row <= size; row++) {
      for (let column = 1; column <= size; column++) {
        const cubeKey = `cube-${row}-${column}`;
        const isCubeActive = activeCubes.includes(cubeKey);

        cubes.push(
          <div
            key={cubeKey}
            className={style[isCubeActive ? "active" : "cube"]}
            onMouseEnter={() => handleCubeHover(row, column, cubeKey)}></div>
        );
      }
    }

    return cubes;
  };

  return (
    <div className={style.gridWrapper}>
      {isOpen ? (
        <div className={style[`gridContainer${size}`]}>{renderCubes()}</div>
      ) : (
        <img src={placeholder} alt="placeholder" width={300} />
      )}
    </div>
  );
};
export default CubesGrid;
