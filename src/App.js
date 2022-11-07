import logo from './logo.svg';
import './App.css';
import VideoWall from './components/VideoWall';
{/* <script src="https://apis.google.com/js/api.js"></script> */}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <VideoWall></VideoWall>
      </header>
      <form action="../../post" method="post" 
              className="form">
          <button type="submit">Connected?</button>
      </form>
    </div>
  );
}

export default App;
