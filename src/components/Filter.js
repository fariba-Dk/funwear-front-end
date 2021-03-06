import React, { Component } from 'react';


export default class Filter extends Component {
  //dummy component which handles Sort and filter for any onChange event and passes to App.js
  render() {
    return (
      <div className='filter'>
        {/* We need have count of prods, sorting prods latest, lowest and highest, filter sizes */}
        <div className="filter-result">{this.props.count} Products</div>
        {/* sortProducts function handles sort for $,$$$ comes from <FILTER> from App.js</FILTER>*/}
        <div className="filter-sort">Order <select value={this.props.sort} onChange={this.props.sortProducts}>
          <option>Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select></div>
        {/* filterProducts function handles filtering size FROM App.js <Filter> */}
        <div className="filter-size">Filter<select value={this.props.size} onChange={this.props.filterProducts}>
          <option value="">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select></div>
      </div>
    )
  }
}

