import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

//for modals we need to have 2 state show or hide
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      //if product exists show it else if null do not show modal
      //create an onClick for image === HAS TO BE AN ARROW FUNC
      //openModal takes parameter (product) and prefix with this
      //we need a method function openModal
      showPromo: true,
    };
  }
  // componentDidMount(){//call fetchProducts from props
  //   this.props.fetchProducts();
  // }
  openModal = (product) => {
    this.setState({ product });
    //by running this we set as the product of the stat of the component
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product, showPromo } = this.state; //use constructor assignment
    return (
      //implement product list - arr - map method
      <div>
        <Modal className="promo" isOpen={showPromo} style={{ textAlign: 'center' }}>
          <button onClick={() => this.setState({ showPromo: false })}>x</button>
          <img
            src='/images/discount-pic.gif'
            alt='discount promo'
            style={{ width: '100%' }}
          />
        </Modal>
        <Fade bottom cascade={true}>
          <ul className='products'>
            {this.props.products.map((product) => (
              // //get list of products as props from parent comp
              <li key={product._id}>
                <div className='product'>
                  <a
                    href={'#' + product._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={product.image} alt={product.title}></img>
                    <p>{product.title}</p>
                  </a>
                  <div className='product-price'>
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className='button-primary'
                      onClick={() => this.props.addToCart(product)}
                      className='button primary'
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {product && ( //when there's a product this modal is rendered ** also make sure to create a button to close it using 'x'
          <Modal isOpen={true} onRequestClose={this.closeModal}>
            <Zoom>
              <button className='close-modal' onClick={this.closeModal}>
                x
              </button>
              <div className='product-details'>
                <img src={product.image} alt={product.title}></img>
                <div className='product-details-description'>
                  <p>
                    <strong>{product.title}</strong>
                  </p>

                  <p>{product.description}</p>

                  <p>
                    Available Sizes:{' '}
                    {product.availableSizes.map(
                      (
                        x //availableSizes is an array
                      ) => (
                        <span>
                          {' '}
                          <button className='button'>{x}</button>
                        </span>
                      )
                    )}
                  </p>

                  <div className='product-price'>
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className='button primary'
                      onClick={() => {
                        //before closingModal make sure have this.props.addToCart method
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
//redux part
// export default connect((state) => ({ products: state.products.items }), { //getting access to list of products coming from server
//   fetchProducts,
// })(Products);

/*
CONNECT is a function that takes 2 params
1. function that accepts state and => return an obj that defines which part of redux state are we going to use === products === state.products
2. list of actions

connect func => returns another function which as paramter takes the component that we are connecting here ==== Product/js

in JSON.data we need to set a proxy
server is localhost:5000
*/
