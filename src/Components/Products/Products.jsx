import axios from 'axios';
import React, { Component, useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthContext from '../Authentication/AuthContext';
import EditProduct from '../EditProduct/EditProduct';
import Spinner from '../UI/Spinner/Spinner';
import Product from './Product/Product';
import "../../App.css"

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
        let cartItem = {
            productName : product.productName,
            price : product.price,
            quantity : product.quantity,
            userId : authContent.state.auth.username
        }

        axios.post("http://localhost:8080/user/addcart", cartItem)
        .then(res => {
            if(res.data) {
                console.log("Product add", product);
                authContent.notify(`Product ${product.productName} successfully added to cart`, 'success')
                // authContent.history.push("/cart")
            } else {
                authContent.notify('Someting went wrong', 'error')
            }
            
        })

    }

    const onDeleteProduct = product => {
        axios.delete("http://localhost:8080/admin/deleteProduct/" + product.productId)
        .then(res => {
            console.log("Product ",);
            authContent.notify(`Product ${product.productName} successfully deleted`, 'success')
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
                        delete={() => onDeleteProduct(product)}
                        addcart={() => onAddToCart(product)}

                />
                <Route exact path="/editproduct" component={() => <EditProduct />} />
            </>
        )
    });

    return (
            <>
            <div className="container-fluid d-flex pt-2"> 
                {state.products.length < 1 ? <h2 className="text-center mx-auto my-5">No Products to Display</h2> : productsList}
            </div> 
            </>
    )

}
 
export default Products;