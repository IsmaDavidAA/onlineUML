import Button from "../Button/Button";
import Input from "../Input/Input";
import { Ul, FormLogin } from "./FormLogin.styles";
const FormSingup = () => {
      return (
        <FormLogin>
      <label>
        Gmail:
        <input
          type="email"
          placeholder="Gmail"
          name="gmail"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          placeholder="Password"
          name="password"
        />
      </label>
      <br></br>
      <br></br>
      <input
        type="submit"
        value="CREAR CLASE"
      />
        </FormLogin>
      );

};

export default FormSingup;