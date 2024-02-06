import React from "react";
import Head from "../../helper/Head/Head";
import useFetch from "../../hooks/useFetch";
import { STATS_GET } from "../../api";

import Loading from "../../helper/Loading/Loading";
import Error from "../../helper/Error";
const UserStatsGraphics = React.lazy(()=> import('./UserStatsGraphs'))

const UserStats = () => {
  const { data, error, loading, request } = useFetch();

  React.useEffect(() => {
    async function getData() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getData();
  }, [request]);

  if (loading) return <Loading />;
  if (error) {
    return <Error error={error} />;
  }
  if (data)
    return (
      <React.Suspense fallback={<Loading />}>
        <Head title="Estatísticas" />
        <UserStatsGraphics data={data} />
      </React.Suspense>
    );
  else return null;
};

export default UserStats;
