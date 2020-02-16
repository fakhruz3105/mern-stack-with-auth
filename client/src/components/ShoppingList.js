import React, { useState, useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button, Alert } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import {
  getItemsAction,
  delItemAction,
  editAmountAction
} from "../actions/itemActions";
import { clearErrors } from "../actions/errorActions";

const ShoppingList = () => {
  const dispatch = useDispatch();
  // const [item, setItem] = useState({})
  const { items, loading } = useSelector(state => state.item);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const errorData = useSelector(state => state.error);
  const [visible, setVisible] = useState(false);
  const error = errorData.status === 422 ? "At least 1 item" : null;
  // error ? setVisible(true) : setVisible(false);

  useEffect(() => {
    if (error) setVisible(true);
  }, [error]);

  useEffect(() => {
    dispatch(getItemsAction());
  }, [dispatch]);

  const onDismiss = () => {
    setVisible(false);
    dispatch(clearErrors());
  };

  const content = loading ? (
    <h3>Loading...</h3>
  ) : (
    <Container>
      {error ? (
        <Alert color="warning" isOpen={visible} toggle={onDismiss}>
          {error}
        </Alert>
      ) : null}
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name, amount }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem style={{ wordWrap: "break-word" }}>
                <Button
                  className="amount-btn"
                  color="success"
                  size="sm"
                  style={isAuthenticated ? null : { display: "none" }}
                  onClick={() => {
                    dispatch(editAmountAction({ id: _id, amount: amount + 1 }));
                    // console.log({ id: _id, amount: amount+1 })
                  }}
                >
                  &#43;
                </Button>
                {amount}
                <Button
                  className="amount-btn"
                  color="success"
                  size="sm"
                  style={isAuthenticated ? null : { display: "none" }}
                  onClick={() => {
                    dispatch(editAmountAction({ id: _id, amount: amount - 1 }));
                  }}
                >
                  &minus;
                </Button>
                <span style={{ marginLeft: "1rem" }}>{name}</span>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  style={isAuthenticated ? null : { display: "none" }}
                  onClick={() => {
                    dispatch(delItemAction(_id));
                  }}
                >
                  &times;
                </Button>
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );

  return <div>{content}</div>;
};

export default ShoppingList;
