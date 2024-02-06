import React from "react";
import Feed from "./Feed/Feed";
import Head from "../helper/Head/Head";

const Home = () => {

  return (
    <section className="container mainContainer">
      <Head title="Fotos" description="Home do site Dogs" />
      <Feed />
    </section>
  );
};

export default Home;
