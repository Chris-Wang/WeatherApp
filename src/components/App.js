import { Router, Route } from "react-router-dom";
import WeatherBoard from "./weather/WeatherBoard";
import history from "../utils/history";

const App = () => {
  return (
    <Router history={history}>
      <>
        <Route path="/" exact component={WeatherBoard} />
        <Route path="/city/:name" exact component={WeatherBoard} />
      </>
    </Router>
  );
};

export default App;
