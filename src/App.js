import React from 'react';
import { Provider } from "react-redux";
import './App.css';
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Homepage from "./components/screens/homepage";




const App =()=> {
  return (
    <Provider store={store}>
      <Homepage />
    </Provider>
  );
}

export default App;
