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
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomeView} />
        <Route path="/svg" exact component={SvgView} />
        <Route path="/canvas" exact component={CanvasView} />
        <Redirect path="/" exact component={HomeView} />
      </Switch>
    </Router>
  );
}

export default App;
