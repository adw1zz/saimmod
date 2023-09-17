import Input from "./components/Input";
import Estimation from "./components/Estimation";
import "./styles/app.scss";
import { store } from './store/index';
import { Provider } from "react-redux";
import React from "react";
import Histogram from "./components/Histogram";

function App() {
  return (
    <>
      <Provider store={store}>
        <Input />
        <Estimation />
        <Histogram />
      </Provider>
    </>
  );
}

export default App;
