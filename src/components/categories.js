/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Dropdown } from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {/* Render custom icon here */}
    &#x25bc;
    {children}
  </a>
));

export default function CategoriaComponent({ categoria, categorias, onClick }) {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Categorias
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {categorias.map((valor, index) => (
          <Dropdown.Item
            eventKey={index}
            onClick={onClick.bind(null, 1, valor)}
          >
            {valor}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
