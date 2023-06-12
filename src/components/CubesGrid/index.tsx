import placeholder from "./assets/placeholder.gif";
import gameover from "./assets/gameover.jpg";

import style from "./styles.module.css";

type gridPropsType = {
  size: number;
  setCubes: (arg: any) => void;
  cubes: String[];
  isOpen: boolean;
  gameResult: string;
};

const CubesGrid = ({
  size,
  setCubes,
  cubes,
  isOpen,
  gameResult,
}: gridPropsType) => {
  const handleCubeHover = (row: number, column: number) => {
    const location = `row ${row}, column ${column}`;
    if (cubes.indexOf(location) === -1) {
      setCubes((prev: any) => [...prev, location]);
    } else {
      setCubes((prev: any) => prev.filter((el: any) => el !== location));
    }
  };

  const renderCubes = () => {
    const allCubes = [];

    for (let row = 1; row <= size; row++) {
      for (let column = 1; column <= size; column++) {
        const cubeKey = `row ${row}, column ${column}`;
        const isCubeActive = cubes.includes(cubeKey);

        allCubes.push(
          <div
            key={cubeKey}
            className={style[isCubeActive ? "active" : "cube"]}
            onMouseEnter={() => handleCubeHover(row, column)}></div>
        );
      }
    }

    return allCubes;
  };

  return (
    <div className={style.gridWrapper}>
      {isOpen ? (
        <div className={style[`gridContainer${size}`]}>{renderCubes()}</div>
      ) : gameResult ? (
        <img src={gameover} alt="game over" width={300} />
      ) : (
        <img src={placeholder} alt="placeholder" width={300} />
      )}
    </div>
  );
};
export default CubesGrid;
