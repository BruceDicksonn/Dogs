import React from "react";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const graphData = data.map(({ nome, acessos }) => {
      return { x: nome, y: Number(acessos) };
    });

    console.log(graphData);

    setTotal(
      data
        .map(({ acessos }) => Number(acessos))
        .reduce((prev, curr) => prev + curr, 0)
    );

    setGraph(graphData);
  }, [data]);

  return (
    <section className={`anime-left ${styles.graph}`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar data={graph} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
