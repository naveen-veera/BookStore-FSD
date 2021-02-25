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
        let cartItem = {
            productName : product.productName,
            price : product.price,
            quantity : product.quantity,
            userId : authContent.state.auth.username
        }

        axios.post("http://localhost:8080/user/addcart", cartItem)
        .then(res => {
            if(res.data) {
                authContent.notify(`Product ${<b>{cartItem.productName}</b>} successfully added to cart`, 'success')
                // authContent.history.push("/cart")
            } else {
                authContent.notify('Someting went wrong', 'error')
            }
            
        })

    }

    const onDeleteProduct = product => {
        axios.delete("http://localhost:8080/admin/deleteProduct/" + product.productId)
        .then(res => {
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
                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                        <img src="https://images.pexels.com/photos/1560093/pexels-photo-1560093.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                        <img src="http://trumpwallpapers.com/wp-content/uploads/Book-Wallpaper-01-2716-x-1810.jpg" class="d-block w-100" alt="..."/>
                        </div>
                        <div class="carousel-item">
                        <img src="..." class="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            <div className="container-fluid d-flex pt-2"> 
                {state.products.length < 1 ? <h2 className="text-center mx-auto my-5">No Products to Display</h2> : productsList}
            </div> 
            </>
    )

}
 
export default Products;