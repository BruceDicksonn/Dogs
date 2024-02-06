import React from "react";
import styles from "./Image.module.css";
const Image = ({ ...props }) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad({ target }) {
    setSkeleton(false);
    target.style.opacity = 1;
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton} />}
      <img onLoad={handleLoad} className={styles.img} {...props} />
    </div>
  );
};

export default Image;
