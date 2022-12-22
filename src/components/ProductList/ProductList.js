import React, { useState, useEffect } from "react";
import noPhoto from '../../assets/images/noPhoto.png'
import ProductService from './../../services/productService';
import CategoryService from './../../services/categoryService';
import { Link } from 'react-router-dom';
import Helper from './../../helper/Helper';

function ProductList() {
    const [state, setState] = useState({
        loading: false,
        products: [],
        categories: [],
        erroMessage: ""
    })

    useEffect( () => {
        try {
            setState({...state, loading: true});
            async function getData() {
                let resProducts = await ProductService.getProducts();
                let resCategories = await CategoryService.getCategories();
                setState({
                    ...state,
                    loading: false,
                    products: resProducts.data,
                    categories: resCategories.data
                })
            }

            getData();
            
        } catch (error) {
            setState({
                ...state,
                erroMessage: error.message
            })
        }
    }, [])

    const getCategoryName = (categoryId) => {
        let category = categories.find((cat) => cat.id == categoryId);
        return category.name
    }

    const { loading, products, categories } = state;

    return (
        <>
            <section className="product-info my-2">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <h3 className="me-2">Cafe Legend Manager</h3>
                        <Link className="btn btn-primary btn-sm">
                            <i className="fa fa-plus-circle me-2"></i>
                            Create Product
                        </Link>
                    </div>
                    <p>Ipsum elit nulla tempor pariatur quis quis consectetur pariatur consequat fugiat nisi proident adipisicing ullamco. Esse ad mollit reprehenderit adipisicing labore occaecat nulla veniam. Eu nulla nulla culpa magna proident occaecat elit culpa non culpa. Consequat dolore est voluptate pariatur laborum aute labore culpa ipsum ad ipsum veniam sunt. Voluptate ex excepteur amet minim anim ullamco occaecat pariatur quis consectetur.</p>
                    <div>
                        <form className="d-flex w-25 align-items-center">
                            <input type="search" className="form-control me-2" />
                            <button className="btn btn-outline-success btn-sm">Search</button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="show-product mb-2">
                <div className="container">
                    <div className="card-deck row">
                        {
                            loading ? <p>Loading data ...</p> : (
                                products.map((product,index) => (
                                    <div className="card col-md-3 mb-2 mx-4" key={index}>
                                        <img className="card-img-top" src={product.photo || noPhoto} alt="no photo" />
                                        <div className="card-body text-center">
                                            <p className="card-title me-2 nameProduct">{product.name}</p>
                                            <div className="text-center">
                                                <Link className="me-2">
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Link>
                                                <Link className="">
                                                    <i className="fa-brands fa-expeditedssl"></i>
                                                </Link>
                                            </div>
                                            <div className="card-text">
                                                <p>{product.size.join(" | ")}</p>
                                                <p>Giá: <span className="price">{Helper.formatCurrencyToVND(product.price)}</span></p>
                                            </div>
                                        </div>
                                        <div class="card-footer text-center">
                                            <small class="text-muted">{getCategoryName(product.categoryId)}</small>
                                        </div>
                                    </div>
                                ))
                            )
                        }
                    
                    </div>
                </div>
            </section>
    
        </>
    )
}

export default ProductList;