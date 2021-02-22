import axios from 'axios';
import React, { Component } from 'react';
import Spinner from '../UI/Spinner/Spinner';
import Product from './Product/Product';

class Produts extends Component {

    state = { 
        products : [],
        loading : false
     }

    componentDidMount() {
        this.setState({loading : true});
        axios.get("http://localhost:8080/products", {})
        .then(res => {
            this.setState({products : res.data, loading : false})
        })
        .catch(err => {
            this.setState({loading : false})
        })
    }

    render() { 

        const loaderStyle = {
            width : "10rem",
            height : "10rem"
        }

        const loader = <Spinner style={loaderStyle} />

        return ( 
            <>
               {this.state.loading && loader} 

                <div className="container-fluid d-flex">
                    {
                        this.state.products.map( product => {
                            return (
                                <Product 
                                        productName={product.productName}
                                        price={product.price}
                                        url={product.imageurl}
                                        description={product.description}
                                        key={product.productId}
                                />
                            )
                        })
                    }
                </div>
            </>
         );
    }
}
 
export default Produts;