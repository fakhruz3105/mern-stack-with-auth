import React from "react";
import { logoutAction } from "../actions/authActions";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "reactstrap";

export default function Logout() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const content = (
    <>
      <NavLink
        onClick={() => dispatch(logoutAction())}
        href="#"
        style={isAuthenticated ? null : { display: "none" }}
      >
        Logout
      </NavLink>
    </>
  );

  return <div>{content}</div>;
}
