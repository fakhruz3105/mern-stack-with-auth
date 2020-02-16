import React, { useState, useEffect, useCallback } from "react";
import { registerUserAction } from "../actions/authActions";
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

export default function RegisterModal() {
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const errorData = useSelector(state => state.error);
  const dispatch = useDispatch();
  const errors = errorData.id === "REGISTER_FAIL" ? errorData : null;

  useEffect(() => {
    if (isAuthenticated && modal) {
      toggle();
    } // eslint-disable-next-line
  }, [isAuthenticated]);

  const toggle = useCallback(() => {
    setModal(!modal);
    dispatch(clearErrors());
  }, [modal, dispatch]);

  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    //Attempt registration
    dispatch(registerUserAction(user));
  };

  const content = (
    <>
      <NavLink
        href="#"
        onClick={toggle}
        style={isAuthenticated ? { display: "none" } : null}
      >
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          {errors ? (
            <Alert color="danger">{errors.message.message}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                onChange={onChange}
              />
              <Label style={{ marginTop: "1rem" }} for="email">
                Email
              </Label>
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
              <Label style={{ marginTop: "1rem" }} for="password2">
                Confirm Password
              </Label>
              <Input
                type="password"
                placeholder="Repeat Password"
                name="password2"
                id="password2"
                onChange={onChange}
              />
              <Button
                style={{ marginTop: "2rem" }}
                block
                color="dark"
                onClick={onSubmit}
              >
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );

  return <div>{content}</div>;
}
