import { Router, Route } from "react-router-dom"
import './App.css';
import Register from "../Components/register";
import Login from "../Components/login";

const App = () => {
  return <>
      <Router>
        <Route path="/" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Router>
  </>
}

export default App;
