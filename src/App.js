import logo from './logo.svg';
import './App.css';
import {Button, Container, Nav, NavDropdown, Navbar, Card, Col, Row, Form, InputGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Cart from './Cart'; // Import your Cart component
import Home from './Home'; // Import your Home component


function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://dummyjson.com/products");
      setData(response.data.products);
    }
    fetchData();
  }, []);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(
      data.filter((product) =>
        product.title.toLowerCase().includes(input.toLowerCase()) ||
        product.category.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [input, data]);


  return (
    <div className="App">
      <header>
        <BrowserRouter>
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Ecommerce Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <NavLink to="/" className="nav-link">Home</NavLink>
              <NavLink to="/cart" className="nav-link">Cart</NavLink>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route exact path="/Cart" element={<Cart />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
