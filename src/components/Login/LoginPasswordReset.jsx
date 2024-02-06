import React from "react";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import Error from "../../helper/Error";
import { PASSWORD_RESET } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../../helper/Head/Head";

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState("");
  const [key, setKey] = React.useState("");

  const { loading, error, request } = useFetch();

  const password = useForm();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response.ok) navigate("/login");
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Resete a senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
