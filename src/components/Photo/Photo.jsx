import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { PHOTO_GET } from "../../api";
import Error from "../../helper/Error";
import Loading from "../../helper/Loading/Loading";
import PhotoContent from "./PhotoContent";
import Head from "../../helper/Head/Head";

const Photo = () => {
  const { id } = useParams();
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(id);
    request(url, options);
  }, [id, request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section>
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  else return null;
};

export default Photo;
