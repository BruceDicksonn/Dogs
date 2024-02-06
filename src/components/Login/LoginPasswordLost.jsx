import React from "react";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import Error from "../../helper/Error";
import { PASSWORD_LOST } from "../../api";
import Head from "../../helper/Head/Head";

const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: location.href.replace("perdeu", "resetar"),
      });

      const { json } = await request(url, options);
    }
  }

  return (
    <section>
      <Head title="Perdeu a senha" className="animeLeft" />
      <h1 className="titlw">Perdeu a senha ?</h1>
      {data ? (
        <p style={{color:"#4c1"}}>{data}</p>
      ) : (
        <form action="">
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando</Button>
          ) : (
            <Button>Enviar Email</Button>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordLost;
