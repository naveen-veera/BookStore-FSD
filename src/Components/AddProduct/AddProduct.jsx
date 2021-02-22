import React, { Component } from 'react';
import axios from "axios";
import Alert from '../UI/Alert/Alert';
import Spinner from '../UI/Spinner/Spinner';

class AddProduct extends Component {

    state = {
        credentials : {
            productName : '',
            description : '',
            price : '',
            imageurl : ''
        }, 
        alert : {
            isAlertThere : false,
            alertMessage : '',
            success : true
        },
        loading : false
    }

    closeAlert = () => {
        let alertState = {...this.state.alert};
        alertState.isAlertThere = false;
        alertState.alertMessage = '';
        alertState.success = false;
        this.setState({alert : alertState});
    }

    onChangeHandler = (event) => {
        const tempCredentials = {...this.state.credentials};
        const name = event.target.getAttribute('id');
        const value = event.target.value;

        tempCredentials[name] = value;
        this.setState({credentials : tempCredentials});
    }

    onSubmitHandler = async(e) => {
        this.setState({loading : true});
        e.preventDefault();
        console.log(this.state.credentials);
        await axios.post('http://localhost:8080/admin/addproduct', this.state.credentials, {
            headers: {"Access-Control-Allow-Origin": "*"}
        })
        .then(res => {
            if(res.data) {
                this.setState({alert : {
                    isAlertThere : true,
                    alertMessage : 'Product Successfully Added',
                    success : true
                },
                loading : false
            });
            } else {
                this.setState({alert : {
                    isAlertThere : true,
                    alertMessage : 'Something went wrong',
                    false : true
                },
                loading : false
            });
            }
            
        }) 
    }


    render() { 

        const loaderStyle = {
            width : "10rem",
            height : "10rem"
        }

        const loader = <Spinner style={loaderStyle} />

        const form = (
            <div className="container p-4 rounded bg-info text-dark w-50">
                    <form method="post" onSubmit={this.onSubmitHandler}>
                        <div className="mb-3">
                            <label htmlFor="productName" className="form-label">Product Name</label>
                            <input type="text" className="form-control" required value={this.state.credentials.productName} id="productName" onChange={this.onChangeHandler} aria-describedby="emailHelp"/>
                            <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="form-floating ">
                            <textarea className="form-control mb-2" style={{height : "8rem"}} required value={this.state.credentials.description} onChange={this.onChangeHandler}  placeholder="Leave a comment here" id="description"></textarea>
                            <label htmlFor="description">Product Description</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="text" className="form-control" required value={this.state.credentials.price} onChange={this.onChangeHandler} id="price"/>
                        </div> 
                        <div className="mb-3">
                            <label htmlFor="imageurl" className="form-label">Image URL</label>
                            <input type="text" required className="form-control" value={this.state.credentials.imageurl} onChange={this.onChangeHandler} id="imageurl"/>
                        </div>
                        <button type="submit" id="submit" className="btn btn-primary">Submit</button>
                    </form> 
                </div>
        )

        return ( 
            <>
                <h1 className="text-center my-4">Add Product</h1>
                {
                    this.state.alert.isAlertThere 
                    && <Alert 
                            alertMessage={this.state.alert.alertMessage} 
                            success={this.state.alert.success}
                            click={this.closeAlert} 
                        />
                }
                {this.state.loading ? loader : form}
                
            </>
         );
    }
}
 
export default AddProduct;