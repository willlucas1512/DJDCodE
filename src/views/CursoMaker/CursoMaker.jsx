import React, { useState, useEffect } from "react";
import {
  Dialog,
  Typography,
  TextField,
  Button,
  IconButton,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";
import MobileNavbar from "../../components/MobileNavbar/MobileNavbar";
import LevelSelector from "./LevelSelector";
import classNames from "classnames";
import x from "./close.png";
import oneone from "./thumbnails/11.png";
import twotwo from "./thumbnails/22.png";
import threethree from "./thumbnails/33.png";
import fourfour from "./thumbnails/44.png";
import { useHistory } from "react-router-dom";
import Style from "./CursoMaker.module.scss";
import { Stack } from "@mui/material";

const CursoMaker = () => {
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(true);
  const defaultValues = {
    colunas: 10,
    linhas: 8,
    niveis: 5,
    introducao: "",
  };
  const initialLevelsEmptyObj = Object.fromEntries(
    Array.from({ length: defaultValues.niveis }, (_, i) => [i + 1, {}])
  );
  const [course, setCourse] = useState({
    niveis: initialLevelsEmptyObj,
  });
  const [editType, setEditType] = useState("map");
  const [deleteMode, setDeleteMode] = useState(false);
  const [eraseAll, setEraseAll] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [niveis, setNiveis] = useState(defaultValues.niveis);
  const [mapRows, setMapRows] = useState(defaultValues.linhas);
  const [mapColumns, setMapColumns] = useState(defaultValues.colunas);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [thumbnailModalOpen, setThumbnailModalOpen] = useState(false);
  const [introModalOpen, setIntroModalOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event, setOpen) => {
    event.preventDefault();
    setMapRows(Number(formValues.linhas));
    setMapColumns(Number(formValues.colunas));
    setNiveis(Number(formValues.niveis));
    setCourse((prevCourse) => ({
      ...prevCourse,
      introducao: formValues.introducao,
      qtd_niveis: Number(formValues.niveis),
      colunas: Number(formValues.colunas),
      linhas: Number(formValues.linhas),
      nome: formValues.nome,
      thumbnail: formValues.radios,
      niveis: {
        ...prevCourse.niveis,
        [selectedLevel]: {
          ...prevCourse.niveis[selectedLevel],
          dica: formValues.dicas,
        },
      },
    }));
    handleClose(setOpen);
  };

  const handleClose = (pFunc) => {
    pFunc(false);
  };

  const handleOpen = (pFunc) => {
    pFunc(true);
  };

  const handleEditType = () => {
    setEditType(editType === "map" ? "blocks" : "map");
  };

  const handleDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const eraseAllTiles = () => {
    setEraseAll(true);
    setCourse({
      niveis: initialLevelsEmptyObj,
    });
    setTimeout(() => {
      setEraseAll(false);
    }, 100);
    handleClose(setDeleteModalOpen);
  };

  const IsMobile = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const gridClass = classNames({
    [Style.canvas_map]: editType === "map",
    [Style.canvas_blocks]: editType === "blocks",
  });

  useEffect(() => {
    if (!isMobile) {
      setNiveis(10);
      setMapRows(16);
      setMapColumns(20);
    }
  }, [isMobile]);

  useEffect(() => {
    IsMobile();
    handleOpen(setIntroModalOpen);
    if (!localStorage.getItem("user")) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        open={editModalOpen}
        onClose={() => handleClose(setEditModalOpen)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
          <div className={Style.modal}>
            <div className={Style.noTitle}>
              <IconButton
                className={Style.iconButtonNoTitle}
                onClick={() => handleClose(setEditModalOpen)}
              >
                <img src={x} alt={"x"} height={"16px"} width={"16px"} />
              </IconButton>
            </div>
            <form onSubmit={(e) => handleSubmit(e, setEditModalOpen)}>
              <div className={Style.modalContent}>
                <div className={Style.input1}>
                  <Typography
                    color={"textSecondary"}
                    variant={"body1"}
                    id="simple-modal-description"
                  >
                    <b> Quantidade de colunas e linhas no mapa</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <Typography
                    variant={"caption"}
                    color={"textSecondary"}
                    id="simple-modal-description"
                  >
                    <b>Atenção:</b> Editar estes valores no meio da edição do
                    mapa, apagará seu progresso atual.
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputProps={{
                      inputProps: {
                        max: 20,
                        style: { color: "#303030" },
                      },
                    }}
                    variant="outlined"
                    name="colunas"
                    label="Colunas"
                    type="number"
                    value={formValues.colunas}
                    onChange={(e) => handleInputChange(e)}
                  />
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputProps={{
                      inputProps: {
                        max: 20,
                        style: { color: "#303030" },
                      },
                    }}
                    variant="outlined"
                    name="linhas"
                    label="Linhas"
                    type="number"
                    value={formValues.linhas}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className={Style.input2}>
                  <Typography
                    color={"textSecondary"}
                    variant={"body1"}
                    id="simple-modal-description"
                  >
                    <b>Nome do curso</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    variant={"outlined"}
                    inputProps={{
                      style: { color: "#303030" },
                    }}
                    name="nome"
                    label="Nome do curso"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className={Style.input3}>
                  <Typography
                    color={"textSecondary"}
                    variant={"body1"}
                    id="simple-modal-description"
                  >
                    <b> Texto de introdução</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    variant={"outlined"}
                    inputProps={{
                      style: { color: "#303030" },
                    }}
                    name="introducao"
                    label="Introdução"
                    multiline
                    rows="3"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className={Style.verticalSpacer}></div>
                <div className={Style.input4}>
                  <Typography
                    color={"textSecondary"}
                    variant={"body1"}
                    id="simple-modal-description"
                  >
                    <b> Quantidade de níveis</b>
                  </Typography>
                  <div className={Style.verticalSpacer}></div>
                  <TextField
                    InputProps={{
                      inputProps: {
                        max: 10,
                        style: { color: "#303030" },
                      },
                    }}
                    variant="outlined"
                    name="niveis"
                    label="Níveis"
                    type="number"
                    value={formValues.niveis}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className={Style.button}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Parece bom
                </Button>
              </div>
            </form>
          </div>
        }
      </Dialog>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        open={introModalOpen}
        onClose={() => handleClose(setIntroModalOpen)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={Style.modalHelp}>
          <div className={Style.title}>
            <Typography
              color={"textSecondary"}
              variant={"h6"}
              id="simple-modal-description"
            >
              <b> Boas-vindas ao Curso Maker!</b>
            </Typography>
            <IconButton
              className={Style.iconButtonWTitle}
              onClick={() => handleClose(setIntroModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <Typography color={"textSecondary"} variant={"body1"}>
            {" "}
            Aqui você poderá criar um curso, do seu jeito.
          </Typography>
          <Typography color={"textSecondary"} variant={"body2"}>
            <br />
            <b>
              Não se esqueça de definir a posição inicial do seu herói, uma
              porta e uma chave.
            </b>
            <br />
            <br />
            Para selecionar um <i>tile</i>, clique nele na tela da esquerda e
            clique no quadrado desejado na região da direita para posicioná-lo.{" "}
            <br /> Para deletar, clique em apagar, e após clique no <i>tile</i>{" "}
            que deseje deletar.
          </Typography>
          <Typography
            color={"textSecondary"}
            variant={"caption"}
            id="simple-modal-description"
          >
            <br />
            Você deve indicar: <br />• Nome do curso <br />• Texto de introdução{" "}
            <br />• Quantidade de níveis <br />• Tamanho do mapa (linhas x
            colunas) <br />• Miniatura do curso <br />• Dica de cada nível{" "}
            <br />• Mapa de cada nível <br />• Blocos de cada nível
          </Typography>
          <div className={Style.verticalSpacer}></div>
          <div className={Style.buttonsDelete}>
            <Button
              onClick={() => handleClose(setIntroModalOpen)}
              variant="outlined"
              color="primary"
            >
              Beleza
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        open={deleteModalOpen}
        onClose={() => handleClose(setDeleteModalOpen)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={Style.modalDelete}>
          <div className={Style.title}>
            <Typography
              color={"textSecondary"}
              variant={"h6"}
              id="simple-modal-description"
            >
              <b> Apagar tudo?</b>
            </Typography>
            <IconButton
              className={Style.iconButtonWTitle}
              onClick={() => handleClose(setDeleteModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <Typography
            color={"textSecondary"}
            variant={"caption"}
            id="simple-modal-description"
          >
            Essa ação limpará todos os níveis, para você começar do zero.
          </Typography>
          <div className={Style.verticalSpacer}></div>
          <div className={Style.buttonsDelete}>
            <Button
              onClick={() => handleClose(setDeleteModalOpen)}
              variant="outlined"
              color="primary"
            >
              Calma, não!
            </Button>
            <div className={Style.horizontalSpacer}></div>
            <Button onClick={eraseAllTiles} variant="contained" color="primary">
              Apagar
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog
        PaperProps={{
          style: {
            // borderRadius: 10,
            maxHeight: "100%",
            backgroundColor: "#fff",
            padding: "30px",
          },
        }}
        onClose={() => handleClose(setThumbnailModalOpen)}
        open={thumbnailModalOpen}
      >
        <div className={Style.thumbnailModal}>
          <div className={Style.title}>
            <Typography variant={"h6"} color={"textSecondary"}>
              Imagem miniatura do curso
            </Typography>
            <IconButton
              className={Style.iconButton}
              onClick={() => handleClose(setThumbnailModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <div className={Style.verticalSpacer}></div>
          <form onSubmit={(e) => handleSubmit(e, setThumbnailModalOpen)}>
            <RadioGroup onChange={(e) => handleInputChange(e)} name="radios">
              <Stack flexDirection={"column"} alignItems={"center"}>
                <Radio value="11" size="md" />
                <img height={"100px"} width={"200px"} src={oneone} />
                <Radio value="22" size="md" />
                <img height={"100px"} width={"200px"} src={twotwo} />
                <Radio value="33" size="md" />
                <img height={"100px"} width={"200px"} src={threethree} />
                <Radio value="44" size="md" />
                <img height={"100px"} width={"200px"} src={fourfour} />
              </Stack>
            </RadioGroup>
            <div className={Style.verticalSpacer}></div>
            <div className={Style.button}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Parece bom
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
      <Dialog
        PaperProps={{
          style: { borderRadius: 10, maxHeight: "100%" },
        }}
        onClose={() => handleClose(setTipModalOpen)}
        open={tipModalOpen}
      >
        <div className={Style.tipModal}>
          <div className={Style.title}>
            <Typography variant={"h6"} color={"textSecondary"}>
              Dica do nível <b>{selectedLevel}</b>
            </Typography>
            <IconButton
              className={Style.iconButton}
              onClick={() => handleClose(setTipModalOpen)}
            >
              <img src={x} alt={"x"} height={"16px"} width={"16px"} />
            </IconButton>
          </div>
          <div className={Style.verticalSpacer}></div>
          <form onSubmit={(e) => handleSubmit(e, setTipModalOpen)}>
            <TextField
              variant={"outlined"}
              inputProps={{
                style: { color: "#303030" },
              }}
              name="dicas"
              label="Dica"
              multiline
              rows="3"
              onChange={(e) => handleInputChange(e)}
              fullWidth
            />
            <div className={Style.verticalSpacer}></div>
            <div className={Style.button}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
              >
                Parece bom
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
      <div className={Style.root}>
        <div className={Style.menu}>
          <MobileNavbar />
          <div className={Style.menu_levels}>
            <LevelSelector
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              levels={niveis}
            />
          </div>
        </div>
        <div className={gridClass}>
          <Canvas
            course={course}
            updateCourse={setCourse}
            editType={editType}
            deleteMode={deleteMode}
            eraseAll={eraseAll}
            selectedLevel={selectedLevel}
            mapRows={mapRows}
            mapColumns={mapColumns}
            levels={niveis}
          />
          <Toolbar
            course={course}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            levels={niveis}
            editType={editType}
            handleEditType={handleEditType}
            handleDeleteMode={handleDeleteMode}
            deleteMode={deleteMode}
            handleIntroModalOpen={() => handleOpen(setIntroModalOpen)}
            handleDeleteOpen={() => handleOpen(setDeleteModalOpen)}
            handleEditOpen={() => handleOpen(setEditModalOpen)}
            handleTipOpen={() => handleOpen(setTipModalOpen)}
            handleThumbnailOpen={() => handleOpen(setThumbnailModalOpen)}
          />
        </div>
      </div>
    </>
  );
};

export default CursoMaker;
