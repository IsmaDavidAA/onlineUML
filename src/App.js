import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";
import "./App.css";
import HomeView from "./views/HomeView/HomeView";
import CanvasView from "./views/CanvasView/CanvasView";
import SvgView from "./views/SvgView/SvgView";
import HomeLoginView from "./views/HomeLoginView/HomeLoginView";
import { GlobalStyle } from "./GlobalStyle";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeLoginView} />
        <Route path="/tareas" exact component={HomeView} />
        <Route path="/svg" exact component={SvgView} />
        <Route path="/canvas" exact component={CanvasView} />
        <Redirect path="/" exact component={HomeLoginView} />
        <Redirect path="/" exact component={HomeLoginView} />
      </Switch>
      <GlobalStyle/>
    </Router>
  );
}

export default App;
