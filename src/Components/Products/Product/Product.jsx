import React, { Component } from 'react';


class Product extends Component {
    render() { 
        return ( 
            <>
                <div className="rounded bg-light mx-2 my-2 p-3 card w-25 shadow border-3 border-light">
                    <div className="card-body">
                        <img src={this.props.url} class="card-img-top mb-2 rounded" width="350" height="400" alt="..."/>
                        <h5 className="card-title mb-2">{this.props.productName}</h5>
                        <h6 className="card-subtitle mb-2"> ₹ {this.props.price}</h6>
                        <p className="card-text">{this.props.description}</p>
                        <button className="btn btn-primary shadow "> Add to Cart <i className="ml-2 fa fa-cart-plus" aria-hidden="true"></i></button>
                    </div>
                </div>
            </>
         );
    }
}
 
export default Product;