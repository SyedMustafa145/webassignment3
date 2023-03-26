import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbarr from "./Navbar";
import ItemCards from "./ItemCards";
import ArticlePage from "./ArticlePage";
import Cart from "./Cart";

function App() {
  return (
    <Router>

    <Navbarr/>

      <Routes>
        <Route path="/" element={<ItemCards/>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/ArticlePage/:title" element={<ArticlePage/>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/:title" element={<ItemCards/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    </Router>



    );
}

export default App;
