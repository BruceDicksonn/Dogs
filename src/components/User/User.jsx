import React from "react";
import UserHeader from "./UserHeader";
import Feed from "../Feed/Feed";
import { Route, Routes } from "react-router-dom";
import UserPhotoPost from "./UserPhotoPost";
import UserStats from "./UserStats";
import UserContext from "../../context/UserContext";
import NotFound from "../NotFound/NotFound";
import Head from "../../helper/Head/Head";

const User = () => {
  const { data } = React.useContext(UserContext);

  console.log(data);

  return (
    <section className="container">
      <Head title="Minha Conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="estatisticas" element={<UserStats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default User;
