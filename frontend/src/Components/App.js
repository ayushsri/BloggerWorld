import logo from '../logo.svg';
import './App.css';
import HomePage from "./Hompage/HomePage"
import NavBar from "./Hompage/NavBar";
import Blogs from "./Blogs/Blogs";

function App() {
  return (
    <div className="App">
        <NavBar/>
     <HomePage/>
     <Blogs/>
    </div>
  );
}

export default App;
