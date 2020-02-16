import React, { useState, useEffect } from "react";
import { loginUserAction } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";

export default function LoginModal() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const errorData = useSelector(state => state.error);
  const dispatch = useDispatch();
  const errors = errorData.id === "LOGIN_FAIL" ? errorData : null;

  useEffect(() => {
    if (isAuthenticated && modal) {
      toggle();
    } // eslint-disable-next-line
  }, [isAuthenticated]);

  const toggle = () => {
    setModal(!modal);
    dispatch(clearErrors());
  };

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    //Attempt registration
    dispatch(loginUserAction(user));
  };

  const content = (
    <>
      <NavLink
        href="#"
        onClick={toggle}
        style={isAuthenticated ? { display: "none" } : null}
      >
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          {errors ? (
            <Alert color="danger">{errors.message.message}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                placeholder="Email"
                name="email"
                id="email"
                onChange={onChange}
              />
              <Label style={{ marginTop: "1rem" }} for="password">
                Password
              </Label>
              <Input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                onChange={onChange}
              />
              <Button
                style={{ marginTop: "2rem" }}
                block
                color="dark"
                onClick={onSubmit}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );

  return <div>{content}</div>;
}
