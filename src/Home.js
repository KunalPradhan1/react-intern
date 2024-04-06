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
import Cart from './Cart';
import Alert from 'react-bootstrap/Alert';

function Home() {
    const [show, setShow] = useState(false);
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

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    console.log(cart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
    

    return (
        <div style={{ background: '#eee' }}>
            <header>
                <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Form inline className="justify-content-center"> 
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        input type="search"
                                        placeholder="Search"
                                        className=" mr-sm-2"
                                        onChange={(e) => setInput(e.target.value)}
                                        value={input}
                                        style={{ width: '400px' }} 
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Navbar>
                <Alert show={show} variant="success" dismissible>
                    <Alert.Heading>Product added to Cart</Alert.Heading>
                    <hr />
                    <div className="d-flex justify-content-end">
                     <Button onClick={() => setShow(false)} variant="outline-success">
                     Close me
                     </Button>
                </div>
                 </Alert>
            </header>
            <main>
                <Row classname="px-4 my-5">
                    {filteredData.map((product) => (
                        <Col sm={4}>
                            <Card style={{ width: '18rem', height: '100%' }}> 
                                <Card.Img variant="top" src={product.thumbnail} style={{ height: '200px', objectFit: 'cover' }} /> 
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text>
                                        {product.description}
                                        <br></br>
                                        ${product.price.toFixed(2)}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => {addToCart(product); setShow(true);}}>Add To Cart</Button>
                                </Card.Body>
                            </Card>
                            <br></br>
                        </Col>
                    ))}
                </Row>

            </main>
        </div>
    );
  }
  export default Home;