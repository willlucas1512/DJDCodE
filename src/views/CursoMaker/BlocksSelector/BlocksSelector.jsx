import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import block1 from "./block1.png";
import block2 from "./block2.png";
import block3 from "./block3.png";
import block4 from "./block4.png";
import block5 from "./block5.png";
import block6 from "./block6.png";
import block7 from "./block7.png";
import block8 from "./block8.png";
import block9 from "./block9.png";
import block10 from "./block10.png";
import Style from "./BlocksSelector.module.scss";

const BlocksSelector = (props) => {
  const { allTiles, selectedLevel, updateCourse, course } = props;

  function setNewCourse() {
    let newCourse = [...course];
    const blocosSelected = blocos.current.filter((b) => b.selected);
    newCourse[selectedLevel].blocks = blocosSelected;
    updateCourse(newCourse);
  }

  const blocosInitial = [
    { img: block1, alt: "Bloco andar pra frente", selected: false },
    { img: block2, alt: "Bloco virar pra esquerda", selected: false },
    { img: block3, alt: "Bloco virar pra direita", selected: false },
    { img: block4, alt: "Bloco repetir", selected: false },
    { img: block5, alt: "Bloco if", selected: false },
    { img: block6, alt: "Bloco ifelse", selected: false },
    { img: block7, alt: "Bloco smallerthan", selected: false },
    { img: block8, alt: "Bloco biggerthan", selected: false },
    { img: block9, alt: "Bloco and", selected: false },
    { img: block10, alt: "Bloco repeatxtimes", selected: false },
  ];

  let blocos = useRef(blocosInitial);

  useEffect(() => {
    let newCourse = [...course];
    newCourse[selectedLevel].tiles = allTiles[selectedLevel];
    updateCourse(newCourse);
  }, [allTiles]);

  useEffect(() => {
    blocos.current = [...blocosInitial];
  }, [selectedLevel]);

  return (
    <div className={Style.root}>
      {blocos.current.map((bloco, index) => {
        const blockClass = classNames(Style.bloco, {
          [Style.nonClick]: !bloco.selected,
          [Style.click]: bloco.selected,
        });
        return (
          <div
            onClick={() => {
              blocos.current[index].selected = !blocos.current[index].selected;
              setNewCourse();
            }}
            className={blockClass}
          >
            <img alt={bloco.alt} src={bloco.img} />
          </div>
        );
      })}
    </div>
  );
};

export default BlocksSelector;
