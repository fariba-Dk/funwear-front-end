import React from 'react';
// import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import './index.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      //by default there is no item in cart
      //cartItems: [], we change JSON.parse to reverse JSON.stringify
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [], //else empty array
      //have to check if string cartItems exists => parse it, else []
      size: '', //filter thru all sizes
      sort: '', //sort thru $ and $$$
      order: {},
    };
  }
  async componentDidMount() {
    const { data } = await axios.get('/api/products');
    this.setState({
      products: data,
    });
  }
  //parent component is responsible for saving the order
  createOrder = (order) => {
    axios.post('/api/orders', order).then((resp) =>
      this.setState({
        order: resp.data,
      })
    );
  };

  //SORT METHOD ON LOWEST/HIGHEST/NEWEST
  sortProducts = (event) => {
    //function used to handle onchange event for sorting
    //CONVERTING TO CHANGE FUNC TO METHOD FUNC WE CAN ACCESS THIS.SET-STATE
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      //need to get access to filtered product
      //create a clone of array
      products: this.state.products.slice().sort((a, b) =>
        sort === 'lowest'
          ? a.price > b.price
            ? 1
            : -1
          : sort === 'highest'
          ? a.price < b.price
            ? 1
            : -1
          : //newest _id is greater num than the oldest one
          a._id < b._id
          ? 1
          : -1
      ),
    }));
  };

  //FILTER METHOD ON SIZE
  filterProducts = (event) => {
    //function handling onchange event thru filtering thru the sizes
    //CONVERTING TO CHANGE FUNC TO METHOD FUNC WE CAN ACCESS THIS.SET-STATE
    //THE VALUE OF SIZE IS event.target.value
    let size = event.target.value;
    if (size === '') {
      this.setState({
        size: size,
      });
    } else {
      this.setState({
        size: size,
        //for products using filter method
        //checking for size! if > 0 => the size exists
        products: this.state.products.filter(
          (product) => product.availableSizes.indexOf(size) >= 0
        ),
      });
    }
  };

  //ADD TO CART - method
  addToCart = (product) => {
    //clone-copy of cartItems using slice
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    //using forEach arr method to iterate over cartItems arr
    cartItems.forEach((item) => {
      //if _id exists then ++
      if (item._id === product._id) {
        item.count++;
        //set flag to true
        alreadyInCart = true;
      }
    });
    //if prod is not in the cart => push the prod inside cart
    if (!alreadyInCart) {
      //instead of having product we are using the fields of prods using spread to get the fields - an instance of this product
      cartItems.push({ ...product, count: 1 });
    } //after adding new items we need to update state
    this.setState({ cartItems });
    //to make the cart stay PRESERVED => after adding items and setting state, use setItem(key: string, value: string) but since cartItems is an OBJECT so we use JSON.stringify to convert obj to string AS WELL AS REMOVING THE ITEMS TOO
    //this.state
    localStorage.setItem('cartItems', JSON.stringify(this.state.cartItems));
  };

  //REMOVE FROM CART
  removeFromCart = (product) => {
    //create a copy -an instance of cartItems
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id),
    }); //have to preserve the cart for remove as well
    localStorage.setItem(
      'cartItems',
      //this is the value that we set inside the cart item on l ine 104
      JSON.stringify(cartItems.filter((x) => x._id !== product._id))
    );
  };

  render() {
    return (
      <div className='grid-container'>
        <header>
          <a href='/'>FunWear🌼Fashion</a>
          <a href='#' alt='admin'>
            Admin
          </a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter
                //passing count & sort & size as props to Filter
                count={this.state.products.length}
                sort={this.state.sort}
                size={this.state.size}
                // functions handling onChange events
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts}
              ></Filter>
              <Products
                products={this.state.products}
                //adding we define addToCart as a property
                //this.addToCart is responsible for it
                addToCart={this.addToCart}
              ></Products>
            </div>
            <div className='sidebar'>
              <Cart
                //the cartItems comes from this.state.cartItems
                cartItems={this.state.cartItems}
                order={this.state.order}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}
              />
            </div>
          </div>
        </main>
        <footer>© FunWear🌼Fashion</footer>
      </div>
    );
  }
}

export default App;
