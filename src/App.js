import './App.css';

function App() {
  return (
    <div className="App">
        <h1>Hello World</h1>
        <h3>
            Fancy display heading
            <small className="text-muted">With faded secondary text</small>
        </h3>
        <button type="button" class="btn btn-primary" onClick = {() => {alert("Clicked!")}}>Click Me!</button>
    </div>
  );
}

export default App;
