import React from "react";
import Enviar from "../../assets/enviar.svg?react";
import Error from "../../helper/Error";
import useFetch from "../../hooks/useFetch";
import { COMMENT_POST } from "../../api";
import styles from "./PhotoCommentsForm.module.css";

const PhotoCommentsForm = ({ id, setComments, single }) => {
  const [comment, setComment] = React.useState("");
  const { error, request } = useFetch();

  async function handleSubmit(ev) {
    ev.preventDefault();

    const token = localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, { comment }, token);
    console.log(url, options);

    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button className={styles.button}>
        <Enviar />
      </button>
      {error && <Error error={error} />}
    </form>
  );
};

export default PhotoCommentsForm;
