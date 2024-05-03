import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Home";
import Studenter from "./Studenter";
import './App.css';
import Nav from "./Nav";
import SingleStudent from "./SingleStudent";
function App() {
  return (
    <div className="App">

<Router>
<Nav/>
<Routes>
  <Route path="/" element={ <Home/>} />
  <Route path="/studenter" element={ <Studenter/> } />
  <Route path="/studenter/:studentId" element={ <SingleStudent/> } />


</Routes>
</Router>

    </div>
  );
}

export default App;
