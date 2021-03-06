import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      showCheckout: false, //by default we do not like to show checkout unless user click on Proceed
    };
  }
  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  //onSubmit handler - we use preventDefault because we don't want to refresh the page when user is clicking on submit
  createOrder = (event) => {
    event.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce(
        (acc, cur) => acc + cur.price * cur.count,
        0
      ),
    };
    this.setState({ showCheckout: true });
    this.props.createOrder(order); //pass in order object = this is not responsible for saving this the PARENT at App.js should
  };
  closeModal = () => {
    this.setState({ showCheckout: false });
  };
  render() {
    const { showCheckout } = this.state;
    const { cartItems, order } = this.props; //destructuring assignment
    //from parent component,we get cartItems here, if method
    return (
      <div>
        {cartItems.length === 0 ? ( //1st div: showing cart-data
          //if cartItem is empty
          //using 2 className here 1. cart 2. cart-header
          <div className='cart cart-header'>Your cart is empty</div>
        ) : (
          //else if cart is not empty => show num of items
          <div className='cart cart-header'>
            You have {cartItems.length} items in your cart{' '}
          </div>
        )}
        {order.email && (
          <Modal isOpen={showCheckout}>
            <Zoom>
              <button className='close-modal' onClick={this.closeModal}>
                x
              </button>
              <div className='order-details'>
                <h3 className='success-message'>Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <ul>
                  <li>
                    <div>Name:</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>Email:</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Address:</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Date:</div>
                    <div>{order.createdAt}</div>
                  </li>

                  <li>
                    <div>Total:</div>
                    <div>{formatCurrency(order.total || 0)}</div>
                  </li>
                  <li>
                    <div>Cart Items:</div>
                    <div>
                      {order.cartItems &&
                        order.cartItems.map((x) => (
                          <div>
                            {x.count} {' x '} {x.title}
                          </div>
                        ))}
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className='cart'>
            <Fade left cascade>
              <ul className='cart-items'>
                {cartItems.map(
                  (
                    item //2nd div: showing cart-data
                  ) => (
                    //we map thru cartItems and convert cartItems to li elms; here we set key=item._id and inside the li we need to form rows for: image & title & price - all with dif <div> + a button to remove any items - IMP: make it an arrow func
                    //NOTE: we use item which is element of cartItems not the cartItems itself
                    <li key={item._id}>
                      <div>
                        <img src={item.image} alt={item.title}></img>
                      </div>
                      <div>
                        <div>{item.title}</div>
                        <div className='right'>
                          {formatCurrency(item.price)} x {item.count}{' '}
                          <button
                            className='button'
                            onClick={() => this.props.removeFromCart(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && ( //this allows for hidden button => use conditional rendering=> if !== 0 else its empty
            <div>
              <div className='cart'>
                <div className='total'>
                  <div>
                    Total:{' '}
                    {formatCurrency(
                      //use reduce method to add price and use formatCurrency
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      //when user click on button Proceed, we need to update === setState to true ** make sure to add to this.state in constructor showCheckout: false === we do not want to show check out by default
                      this.setState({ showCheckout: true });
                    }}
                    className='button primary'
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && ( //if it is true => proceed to <div and create FORM and an onSubmit button
                <Fade right cascade>
                  <div className='cart'>
                    <form onSubmit={this.createOrder}>
                      <ul className='form-container'>
                        <li>
                          <label>Email</label>
                          <input
                            name='email'
                            type='email'
                            required //it is required and onChange we define a function to handle input
                            //when user click on handle input we need to create a function handleInput
                            //a method function that accepts an event and we can access
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Name</label>
                          <input
                            name='name'
                            type='text'
                            required //it is required and onChange we define a function to handle input
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <label>Address</label>
                          <input
                            name='address'
                            type='text'
                            required
                            onChange={this.handleInput}
                          ></input>
                        </li>
                        <li>
                          <button className='button primary' type='submit'>
                            Checkout
                          </button>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
