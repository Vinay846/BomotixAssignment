import './App.css';
import Home from './components/home';
import { Switch, Route } from 'react-router-dom';
import PlayVideo from './components/playVideo';
import NavBar from './components/navBar';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/watch/:id">
          <NavBar />
          <PlayVideo />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
