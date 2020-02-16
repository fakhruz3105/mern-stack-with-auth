import React from "react";
import { logoutAction } from "../actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { NavItem, NavLink } from "reactstrap";

export default function Logout() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  const content = (
    <>
      <NavLink
        onClick={null}
        href="#"
        className="navLink"
        style={isAuthenticated ? null : { display: "none" }}
      >
        {user ? `Welcome, ${user.name}` : null}
      </NavLink>
      <NavLink
        onClick={() => dispatch(logoutAction())}
        href="#"
        className="navLink"
        style={isAuthenticated ? null : { display: "none" }}
      >
        Logout
      </NavLink>
    </>
  );

  return <div>{content}</div>;
}
