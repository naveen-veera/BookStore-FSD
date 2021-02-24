import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import EditProduct from '../EditProduct/EditProduct';
import Spinner from '../UI/Spinner/Spinner';
import Product from './Product/Product';

const Products = props => {
    const [state, setState] = useState({
        products : []
    });

    const [refresh, setRefresh] = useState(true);


    const authContent = useContext(AuthContext);

    useEffect(() => {
        axios.get("http://localhost:8080/products")
        .then(res => {
            setState({products : res.data})
        })
    })

    const onAddToCart = product => () => {
        const cartItem = {
            productName : product.productName,
            price : product.price,
            quantity : product.quantity,
            userId : authContent.state.auth.username
        }

        axios.post("http://localhost:8080/user/addcart", cartItem)
        .then(res => {
            if(res.data) {
                authContent.history.push("/cart")
            }
            
        })

    }

    const onDeleteProduct = product => {
        axios.delete("http://localhost:8080/admin/deleteProduct/" + product)
        .then(res => {
            setRefresh(prevState => {
                return !prevState
            });
        })
    }

   const onEditProduct = product => {
        authContent.history.push("/editproduct", {state : product});
    }

    const productsList = state.products.map( product => {
        return (
            <>
            <Product 
                    id={product.productId}
                    quantity={product.quantity}
                    productName={product.productName}
                    price={product.price}
                    url={product.imageUrl}
                    description={product.description}
                    key={product.productId}
                    edit={() => onEditProduct(product)}
                    delete={() => onDeleteProduct(product.productId)}
                    addcart={() => onAddToCart(product)}

            />

            <Switch>
                <Route exact path="/editproduct" component={() => <EditProduct />} />
            </Switch>
            </>
        )
    });

    return (
            <div className="container-fluid d-flex pt-2">
                {state.products.length < 1 ? <h2 className="text-center mx-auto my-5">No Products to Display</h2> : productsList}
            </div> 
    )

}
 
export default Products;