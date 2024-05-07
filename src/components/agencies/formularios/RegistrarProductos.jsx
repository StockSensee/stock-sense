import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import { InputText, Btnsave,ConvertirCapitalize, useProductosStore, ContainerSelector, Selector, useMarcaStore, BtnFiltro, RegistrarMarca, ListaGenerica, useCategoriasStore, RegistrarCategorias } from "../../../index";
import { useForm } from "react-hook-form";
import { useEmpresaStore } from "../../../store/EmpresaStore";
export function RegistrarProductos({ onClose, dataSelect, accion }) {
  const { insertarproductos, editarproductos } = useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const { marcaItemSelect, datamarca, selectMarca } = useMarcaStore();
  const { categoriasItemSelect, datacategorias, selectcategorias } = useCategoriasStore();
  const [stateMarca, setStateMarca] = useState(false);
  const [stateCategoria, setStateCategoria] = useState(false);
  const [openRegistroMarca, SetopenRegistroMarca] = useState(false);
  const [openRegistroCategoria, SetopenRegistroCategoria] = useState(false);
  const [subaccion, setAccion] = useState("");
  const nuevoRegistroMarca =()=> {
    SetopenRegistroMarca(!openRegistroMarca)
    setAccion("Nuevo")
  };
  const nuevoRegistroCategoria=()=> {
    SetopenRegistroCategoria(!openRegistroCategoria);
    setAccion("Nuevo");
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        descripcion:ConvertirCapitalize(data.nombre),
      };
      await editarproductos(p);
      onClose();
    } else {
      const p = {
        _descripcion:ConvertirCapitalize(data.nombre),
        _idempresa: dataempresa.id,
      };
      await insertarproductos(p);
      onClose();
    }
  }

  useEffect(() => {
    if (accion === "Editar") {
    }
  }, []);
  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar" ? "Editar producto" : "Registrar nuevo producto"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>

        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section>
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.descripcion}
                  type="text"
                  placeholder=""
                  {...register("nombre", {
                    required: true,
                  })}
                />
                <label className="form__label">Descripción</label>
                {errors.nombre?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Marca: </label>
              <Selector funcion={()=>setStateMarca(!stateMarca)} state={stateMarca}
                color="#fc6027" 
                texto1="🍿" 
                texto2={marcaItemSelect?.descripcion}
                />
                {stateMarca && (
                  <ListaGenerica 
                    setState={()=>setStateMarca(!stateMarca)} 
                    bottom="-260px" 
                    scroll="scroll" 
                    data={datamarca} 
                    funcion={selectMarca}/>)}
                <BtnFiltro 
                  bgcolor="#f6f3f3"
                  textcolor="#353535"
                  funcion={nuevoRegistroMarca}
                  icono={<v.agregar/>}/>
            </ContainerSelector>
            <article>
              <InputText icono={<v.iconostock/>}>
                <input
                  className="form__field"
                  type="number"
                  step="0.01"
                  placeholder=""
                  defaultValue={dataSelect.stock}
                  {...register("stock", {
                    required: true,
                  })}
                />
                <label className="form__label">Stock</label>
                {errors.stock?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconostockminimo />}>
                <input 
                  step="0.01" 
                  className="form__field" 
                  defaultValue={dataSelect.stock_minimo} 
                  type="number" 
                  placeholder="" {...register("stockminimo", {required: true,})}/>
                <label className="form__label">Stock minimo</label>
                {errors.stockminimo?.type === "required" && (<p>Campo requerido</p>)}
              </InputText>
            </article>

            <ContainerSelector>
              <label>Categoría: </label>
              <Selector funcion={()=>setStateCategoria(!stateCategoria)} state={stateCategoria}
                color="#fc6027" 
                texto1="🍿" 
                texto2={categoriasItemSelect?.descripcion}
                />
                <BtnFiltro 
                  bgcolor="#f6f3f3"
                  textcolor="#353535"
                  funcion={nuevoRegistroCategoria}
                  icono={<v.agregar/>}/>
                {stateCategoria && (
                  <ListaGenerica 
                    setState={()=>setStateCategoria(!stateCategoria)} 
                    bottom="-160px" 
                    scroll="scroll" 
                    data={datacategorias} 
                    funcion={selectcategorias}/>)}
                
            </ContainerSelector>

            <div className="btnguardarContent">
              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#ef552b"
              />
            </div>
          </section>
        </form>
        {
          openRegistroMarca && (<RegistrarMarca accion={subaccion} onClose={()=>SetopenRegistroMarca(!openRegistroMarca)} dataSelect={dataSelect}/>)
        }
        {
          openRegistroCategoria && (<RegistrarCategorias accion={subaccion} onClose={()=>SetopenRegistroCategoria(!openRegistroCategoria)} dataSelect={dataSelect}/>)
        }
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  svg {
    font-size: 25px;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;
const ContainerEmojiPicker = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;