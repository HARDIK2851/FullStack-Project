import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return /*#__PURE__*/React.createElement("nav", {
    className: "navbar navbar-expand-lg navbar-dark bg-dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Link, {
    className: "navbar-brand",
    to: "/"
  }, "Home"), /*#__PURE__*/React.createElement("button", {
    className: "navbar-toggler",
    type: "button",
    "data-toggle": "collapse",
    "data-target": "#navbarNav",
    "aria-controls": "navbarNav",
    "aria-expanded": "false",
    "aria-label": "Toggle navigation"
  }, /*#__PURE__*/React.createElement("span", {
    className: "navbar-toggler-icon"
  })), /*#__PURE__*/React.createElement("div", {
    className: "collapse navbar-collapse",
    id: "navbarNav"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "navbar-nav"
  }, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: "/create"
  }, "Create Employee")), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement(Link, {
    className: "nav-link",
    to: "/table"
  }, "Employee Table"))))));
};
export default Navbar;