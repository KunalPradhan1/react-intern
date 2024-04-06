import React from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { cart } from "./Home";
var quantity = 1;
var Pprice = 0;
var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
console.log(cartItems);
var total = cartItems.reduce((acc, product) => acc + product.price, 0);
console.log("Total:", total);

function Cart() {


return (
  <section className="h-100" style={{ backgroundColor: "#eee" }}>
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol md="10">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
              Shopping Cart
            </MDBTypography>
            <div>
              <p className="mb-0">
                <a href="#!" className="text-body">
                  price <i className="fas fa-angle-down mt-1"></i>
                </a>
              </p>
            </div>
          </div>

          {cartItems.map((product, index) => (
            <MDBCard className="rounded-3 mb-4" key={index}>
              <MDBCardBody className="p-4">
                <MDBRow className="justify-content-between align-items-center">
                  <MDBCol md="2" lg="2" xl="2">
                    <MDBCardImage
                      className="rounded-3"
                      fluid
                      src={product.thumbnail}
                      alt={product.title}
                    />
                  </MDBCol>
                  <MDBCol md="3" lg="3" xl="3">
                    <p className="lead fw-normal mb-2">{product.title}</p>
                  </MDBCol>
                  <MDBCol
                    md="3"
                    lg="3"
                    xl="2"
                    className="d-flex align-items-center justify-content-around"
                  >
                    <MDBBtn color="link" className="px-2">
                      <MDBIcon fas icon="minus" />
                    </MDBBtn>
                    <MDBInput
                      min={1}
                      defaultValue={1}
                      type="number"
                      size="sm"
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        const newTotal = newQuantity * product.price;
                        console.log(newTotal);
                        total = (total - product.price) + newTotal;
                        window.location.reload();

                      }}
                    />
                    <MDBBtn color="link" className="px-2">
                      <MDBIcon fas icon="plus" />
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                    <MDBTypography tag="h5" className="mb-0">
                      {console.log(quantity * product.price)}
                      ${product.price.toFixed(2)}
                    </MDBTypography>
                    <MDBBtn
                      className="mx-2"
                      color="danger"
                      onClick={() => {
                        const updatedCartItems = cartItems.filter(
                          (item) => item.title !== product.title
                        );
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCartItems)
                        );
                        window.location.reload();
                        console.log(updatedCartItems);
                      }}
                    >
                      Remove
                    </MDBBtn>
                  </MDBCol>
                  <MDBCol md="1" lg="1" xl="1" className="text-end">
                    <a href="#!" className="text-danger">
                      <MDBIcon fas icon="trash text-danger" size="lg" />
                    </a>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          ))}

          <MDBCard>
            <MDBCardBody className="d-flex justify-content-between align-items-center">
              <MDBTypography tag="h5" className="mb-0">
                Total: ${total.toFixed(2)}
              </MDBTypography>
              <MDBBtn className="ms-3" color="warning" size="lg">
                Checkout
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
);

}

export default Cart;