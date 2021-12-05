import React, { useState, useEffect } from "react";
import { calculator } from "../../utils/Calculator";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { Ul } from "./Fomr.styles";
const Form = (props) => {
  const [attributesList, setAttributesList] = useState([]);
  const [methodeList, setMethodeList] = useState([]);
  return (
    <form
      onSubmit={(e) => {
        props.handleNewClass(attributesList, methodeList, e);
      }}
      id={props.id}
    >
      <label>
        Nombre:
        <input
          type="text"
          placeholder="Nombre de la clase"
          name="nombre"
          required={true}
        />
      </label>
      <br></br>
      <fieldset id="atributos" name="atributesList">
        <legend>Atributos:</legend>
        <input
          type="text"
          id={`inputAttributes-${props.id}`}
          placeholder="Nuevo atributo"
        />
        <button
          onClick={() => {
            const inputValue = document.getElementById(
              `inputAttributes-${props.id}`
            ).value;
            if (!calculator.existOnInputList(attributesList, inputValue)) {
              setAttributesList([...attributesList, inputValue]);
            }
          }}
        >
          ADD
        </button>
        <Ul>
          {attributesList.map((element) => {
            return (
              <li key={element}>
                <Input
                  className={`attribute-${props.id}`}
                  value={element}
                  disabled={true}
                  action={console.log("hola")}
                />
              </li>
            );
          })}
        </Ul>
      </fieldset>
      <br></br>
      <fieldset id={`methods-${props.id}`} name="methodsList">
        <legend>Metodos:</legend>
        <input
          type="text"
          id={`inputMethods-${props.id}`}
          placeholder="Nuevo metodo"
        />
        <button
          onClick={() => {
            const inputValue = document.getElementById(
              `inputMethods-${props.id}`
            ).value;
            if (!calculator.existOnInputList(methodeList, inputValue)) {
              setMethodeList([...methodeList, inputValue]);
            }
          }}
        >
          ADD
        </button>
        <Ul>
          {methodeList.map((element) => {
            return (
              <li key={element}>
                <Input
                  className={`method-${props.id}`}
                  value={element}
                  disabled={true}
                  action={console.log("hola")}
                />
              </li>
            );
          })}
        </Ul>
      </fieldset>
      <Button
        action={() => {
          props.closeModal();
        }}
      >
        CANCELAR
      </Button>
      <input
        type="submit"
        value="CREAR CLASE"
        onClick={() => {
          props.setAllGood(true);
        }}
      />
    </form>
  );
};

export default Form;
