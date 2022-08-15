import { Home } from './Components/home/Home';

function App() {
  return (
    <div className="App w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="video-bg">
          <video width="320" height="240" autoPlay loop muted>
            <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4"/>
          Your browser does not support the video tag.
          </video>
      </div>
      
      <Home/>
    </div>
  );
}

export default App;
