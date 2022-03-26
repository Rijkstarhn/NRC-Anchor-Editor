import './App.css';
import React from 'react'
import NavBar from "./containers/Navbar";
import TextArea from "./containers/TextArea";
import OperationArea from "./containers/OperationArea";
import AudioArea from "./containers/AudioArea";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import textareaReducer from "./containers/OperationArea/reducer";

const reducer = combineReducers({
    textareaReducer,
})

const store = createStore(reducer)

function App() {
  return (
    <Provider store={store}>
        <div className="App">
            <NavBar/>
            <TextArea/>
            <AudioArea/>
            <OperationArea/>
        </div>
    </Provider>
  );
}

export default App;
