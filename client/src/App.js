import React, { useEffect } from "react";
import Header from "./components/Header";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";
import store from "./store";
import { Provider } from "react-redux";
import { getUserAction } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(getUserAction());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
