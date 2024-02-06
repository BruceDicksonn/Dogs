import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import useForm from "../../hooks/useForm";
import useFetch from "../../hooks/useFetch";
import { PHOTO_POST } from "../../api";
import Error from "../../helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../../helper/Head/Head";

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("number");
  const idade = useForm("number");

  const [img, setImg] = React.useState({});
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  function handleSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);
    formData.append("img", img.raw);

    const token = localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);
    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="nome" type="text" name="nome" {...nome} />
        <Input label="peso" type="number" name="peso" {...peso} />
        <Input label="idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      {img.preview && (
        <div
          className={styles.preview}
          style={{ backgroundImage: `url('${img.preview}')` }}
        ></div>
      )}
    </section>
  );
};

export default UserPhotoPost;
