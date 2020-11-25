import React from "react";

export default function PaginationComponent({
  proxima,
  anterior,
  ultima,
  atual,
  onClick,
  categoria,
}) {
  return (
    <nav>
      <ul className="pagination pagination-sm mr-4">
        {anterior ? (
          <li className="page-item">
            <button
              onClick={onClick.bind(null, anterior, categoria)}
              className="page-link"
            >
              Anterior
            </button>
          </li>
        ) : (
          ""
        )}
        {[...new Array(ultima)].map((valor, index) => (
          <li
            className={`page-item${index + 1 === atual ? " disabled" : ""}`}
            key={index}
          >
            <button
              className="page-link"
              onClick={() => {
                onClick(index + 1);
                atual = (index + 1).toString;
              }}
            >
              {index + 1}
            </button>
          </li>
        ))}
        {proxima ? (
          <li className="page-item">
            <button
              onClick={onClick.bind(null, proxima, categoria)}
              className="page-link"
            >
              Próxima
            </button>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
}
