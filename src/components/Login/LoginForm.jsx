import React from "react";
import { Link } from "react-router-dom";

import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import useForm from "../../hooks/useForm";
import { UserContext } from "../../context/UserContext";
import Error from "../../helper/Error";

import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button/Button.module.css";
import Head from "../../helper/Head/Head";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Senha" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Carregando...</Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error && 'Dados incorretos'} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a senha ?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta ? Cadastre-se no site</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;
