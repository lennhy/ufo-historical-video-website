import logo from './logo.svg';
import './App.css';
import VideoWall from './components/VideoWall';
{/* <script src="https://apis.google.com/js/api.js"></script> */}

function App() {
  return (
    <div className="parent-container">
      <header className="App-header">
        <VideoWall />
      </header>
    </div>
  );
}

export default App;
