import './App.css';
import Navbar from "./components/navbar";
import TextArea from "./components/text_area";
import AudioArea from "./components/audio_area";
import OperationArea from "./components/operation_area";

function App() {
  return (
    <div className="App">
        <Navbar/>
        <TextArea/>
        <AudioArea/>
        <OperationArea/>
    </div>
  );
}

export default App;
