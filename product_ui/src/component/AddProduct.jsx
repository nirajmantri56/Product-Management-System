import React from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import productService from "../service/product.service";

const AddProduct = () => {

    const [product, setProduct] = useState({
        productName:"",
        description:"",
        price:"",
        status:"",
    });

const [msg,setMsg]=useState("");

    const handleChange=(e)=>{
        const value = e.target.value;
        setProduct({ ...product,[e.target.name]:value})
    };

    const ProductRegister=(e)=>{
        e.preventDefault();
        if(product.productName === '' ){
            toast.error("Name can't be empty!");
        }
        else{
            productService.saveProduct(product).then((res)=>{
                console.log("Product Added Sucessfully");
                // setMsg();
                toast.success("Product Added Successfully");
                setProduct({
                    productName:"",
                    description:"",
                    price:"",
                    status:"",
                });
            }).catch((error)=>{
                console.log(error);
            });
        }
    };

    return(
        <>
            <Toaster />
            <div className="container mt-3 ">
                <div className="row">
                    <div className="col-md-6-offset-md-3">
                        <div className="card">
                            <div className="card-header fs-3 text-center">Add Product</div>
                            {
                                msg && <p className="fs-4 text-center text-success">{msg}</p>
                            }
                            <div className="card-body">
                                <form onSubmit={(e) => ProductRegister(e)}>
                                    <div className="mb-3">
                                        <label>Name</label>
                                        <input type="text" name="productName" className="form-control" onChange={(e)=>handleChange(e)} value={product.productName}/>
                                    </div>

                                    <div className="mb-3">
                                        <label>Description</label>
                                        <input type="text" name="description" className="form-control" onChange={(e)=>handleChange(e)} value={product.description} />
                                    </div>

                                    <div className="mb-3">
                                        <label>Price</label>
                                        <input type="number" name="price" className="form-control" onChange={(e)=>handleChange(e)} value={product.price} />
                                    </div>

                                    <div className="mb-3">
                                        <label>Status</label>
                                        <input type="text" name="status" className="form-control" onChange={(e)=>handleChange(e)} value={product.status} />
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-primary">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddProduct