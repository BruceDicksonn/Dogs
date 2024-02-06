import React from "react";
import FeedPhotos from "./FeedPhotos";
import FeedModal from "./FeedModal";
import PropTypes from "prop-types";

const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  const [pages, setPages] = React.useState([1, 2]);
  const [infinite, setInfinite] = React.useState(true);

  React.useEffect(() => {
    let wait = false;

    function infiniteScroll() {
      if (infinite) {
        const scroll = scrollY;
        const height = document.body.offsetHeight - innerHeight;

        if (scroll > height * 0.75 && !wait) {
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
          setPages((pages) => [...pages, pages.length + 1]);
        }
      }
    }

    addEventListener("scroll", infiniteScroll);
    addEventListener("wheel", infiniteScroll);

    return () => {
      removeEventListener("scroll", infiniteScroll);
      removeEventListener("wheel", infiniteScroll);
    };
  }, [infinite]);

  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
