import './App.css';
import Building from './Building/Building';



function App() {
  const numOfElevatros = 5
  const height = 9
  return (
    <div className="App">
      <Building
        numsFloor={height}
        numOfElevators={numOfElevatros} />

    </div>
  );
}

export default App;
