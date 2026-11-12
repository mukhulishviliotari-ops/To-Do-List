import NavBar from './NavBar';
import Content from './Content';
import Timer from './Timer';

function App() {
  return (
    <div className="AppContainer">
      <NavBar />
      <div className="MainWrapper">
        <Content />
        <Timer />
      </div>
    </div>
  );
}

export default App;