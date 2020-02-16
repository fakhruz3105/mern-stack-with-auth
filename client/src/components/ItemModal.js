import React, { useState } from "react";
import { addItemAction } from "../actions/itemActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export default function ItemModal() {
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = e => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (!item.name) {
      toggle();
    } else {
      dispatch(addItemAction(item));
      setItem({ amount: 1 });
      toggle();
    }
  };

  const content = (
    <>
      <Button
        color="dark"
        className="mb-3"
        style={isAuthenticated ? null : { display: "none" }}
        onClick={toggle}
      >
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add to Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                placeholder="Add item..."
                name="name"
                id="itemName"
                onChange={onChange}
              />
              <Label style={{ marginTop: "1rem" }} for="amount">
                Amount
              </Label>
              <Input
                type="number"
                placeholder="Amount"
                name="amount"
                id="itemAmount"
                onChange={onChange}
              />
              <Button
                style={{ marginTop: "2rem" }}
                block
                color="dark"
                onClick={onSubmit}
              >
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );

  return <div>{content}</div>;
}
