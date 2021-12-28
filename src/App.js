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
import LoginView from "./views/LoginView/LoginView";
import { GlobalStyle } from "./GlobalStyle";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginView} />
        <Route path="/home" exact component={HomeView} />
        <Route path="/svg" exact component={SvgView} />
        <Route path="/canvas" exact component={CanvasView} />
        <Redirect path="/" exact component={LoginView} />
      </Switch>
      <GlobalStyle/>
    </Router>
  );
}

export default App;
