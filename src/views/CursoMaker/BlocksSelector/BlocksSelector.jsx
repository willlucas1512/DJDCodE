import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import block1 from "./block1.png";
import block2 from "./block2.png";
import block3 from "./block3.png";
import block4 from "./block4.png";
import block5 from "./block5.png";
import Style from "./BlocksSelector.module.scss";

const BlocksSelector = (props) => {
  const { selectedLevel, updateCourse } = props;

  function setNewCourse() {
    const blocosSelected = blocos.current.filter((b) => b.selected);
    updateCourse((prevCourse) => ({
      ...prevCourse,
      niveis: {
        ...prevCourse.niveis,
        [selectedLevel]: {
          ...prevCourse.niveis[selectedLevel],
          blocos: blocosSelected,
        },
      },
    }));
  }

  const blocosInitial = [
    { img: block1, alt: "Bloco andar pra cima", selected: false },
    { img: block2, alt: "Bloco andar pra esquerda", selected: false },
    { img: block3, alt: "Bloco andar pra direita", selected: false },
    { img: block4, alt: "Bloco andar pra baixo", selected: false },
    { img: block5, alt: "Bloco repeatxtimes", selected: false },
  ];

  let blocos = useRef(blocosInitial);

  useEffect(() => {
    blocos.current = [...blocosInitial];
  }, [selectedLevel]);

  return (
    <div className={Style.root}>
      <div className={Style.blocksSelector}>
        {blocos.current.map((bloco, index) => {
          const blockClass = classNames(Style.bloco, {
            [Style.nonClick]: !bloco.selected,
            [Style.click]: bloco.selected,
          });
          return (
            <div
              key={index}
              onClick={() => {
                blocos.current[index].selected =
                  !blocos.current[index].selected;
                setNewCourse();
              }}
              className={blockClass}
            >
              <img width={"150"} alt={bloco.alt} src={bloco.img} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlocksSelector;
