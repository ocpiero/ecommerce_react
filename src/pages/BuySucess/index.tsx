import React from "react";
import data from "../../services/data";
import Plot from "react-plotly.js";

const BuySuccess: React.FC = () => {
  const xx = data.index;
  const yy = data.data;

  const blz = yy.map((valor: any) =>
    valor.reduce((acc: any, valor2: any, index: any) => {
      index === 1 ? (acc += valor2) : console.log("indice", index);
    }, [])
  );
  console.log(blz);

  return (
    <>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
          { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
        ]}
        layout={{ width: 320, height: 240, title: "A Fancy Plot" }}
      />
    </>
  );
};

export default BuySuccess;
