import React from "react";
import UserContext from "../../context/UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

const PhotoComments = (props) => {
  const { login } = React.useContext(UserContext);
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef(null);

  React.useEffect(() => {
    const { current } = commentsSection;
    current.scrollTop = current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ""} `}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm single={props.single} id={props.id} setComments={setComments} />}
    </>
  );
};

export default PhotoComments;
