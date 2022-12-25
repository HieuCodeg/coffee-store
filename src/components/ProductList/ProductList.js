import React, { useState, useEffect } from "react";
import noPhoto from '../../assets/images/noPhoto.png'
import ProductService from './../../services/productService';
import CategoryService from './../../services/categoryService';
import { Link } from 'react-router-dom';
import Helper from './../../helper/Helper';
import Loading from './../Loading/Loading';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import FileHelper from './../../helper/FileHelper';


function ProductList() {
    const [state, setState] = useState({
        loading: false,
        products: [],
        categories: [],
        erroMessage: ""
    })

    const [keyword, setKeyword] = useState("")

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

    const handleSearch = async (e) => {
        e.preventDefault();
        setState({ ...state, loading: true });
        let resProducts = await ProductService.getProducts();
        setState({
            ...state,
            loading: false,
            products: keyword? resProducts.data.filter((item) =>item.name.toUpperCase().includes(keyword.toUpperCase()))
                            : resProducts.data
        })
        
    }

    const handleRemoveProduct = async (item) => {
        // let confirm = window.confirm(`Bạn chắc chắn muốn xóa ${item.name}?`);
        // if (confirm) {
        //     setState({...state, loading: true});
        //     let resRemove = await ProductService.removeProduct(item.id);
        //     if (resRemove.data) {
        //         let resProducts = await ProductService.getProducts();
        //         setState({
        //             ...state,
        //             loading: false,
        //             products: resProducts.data
        //         })
        //         toast.success(`${item.name} đã bị xóa`);
        //     } else {
        //         toast.warning("Lỗi hệ thống, vui lòng kiểm tra lại!");
        //     }
        // } 
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success ms-2',
              cancelButton: 'btn btn-danger me-2'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
        title: `Bạn chắc chắn muốn xóa "${item.name}"?`,
        text: "Bạn sẽ không thể khôi phục lại sản phẩm!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Hủy bỏ!',
        reverseButtons: true
        }).then(async (result) => {
        if (result.isConfirmed) {
            // swalWithBootstrapButtons.fire(
            // 'Đã xóa!',
            // `Sản phẩm "${item.name}" đã bị xóa.`,
            // 'success',
            // );
            setState({...state, loading: true});

            //  destroy product
            let fileName = Helper.getFilename(item.photo);
            await FileHelper.destroyImage(fileName);
            let resRemove = await ProductService.removeProduct(item.id);
            if (resRemove.data) {
                let resProducts = await ProductService.getProducts();
                setState({
                    ...state,
                    loading: false,
                    products: resProducts.data
                })
                toast.success(`${item.name} đã bị xóa`);
            } else {
                toast.warning("Lỗi hệ thống, vui lòng kiểm tra lại!");
            }
        } 
        })
        
    }

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
                        <Link className="btn btn-primary btn-sm" to={"/coffee-store/product/create"}>
                            <i className="fa fa-plus-circle me-2"></i>
                            Create Product
                        </Link>
                    </div>
                    <p>Ipsum elit nulla tempor pariatur quis quis consectetur pariatur consequat fugiat nisi proident adipisicing ullamco. Esse ad mollit reprehenderit adipisicing labore occaecat nulla veniam. Eu nulla nulla culpa magna proident occaecat elit culpa non culpa. Consequat dolore est voluptate pariatur laborum aute labore culpa ipsum ad ipsum veniam sunt. Voluptate ex excepteur amet minim anim ullamco occaecat pariatur quis consectetur.</p>
                    <div>
                        <form onSubmit={handleSearch} className="d-flex w-25 align-items-center">
                            <input type="search" className="form-control me-2" 
                                    onInput={(e) => setKeyword(e.target.value)}
                            />
                            <button type="submit" className="btn btn-outline-success btn-sm">Search</button>
                        </form>
                    </div>
                </div>
            </section>
            <section className="show-product mb-2">
                <div className="container">
                    <div className="card-deck row">
                        {
                            loading ? <Loading></Loading> : (
                                products.map((product,index) => (
                                    <div className="card col-md-3 mb-2 mx-4" key={index}>
                                        <img role="button" className="card-img-top zoom mt-2" src={product.photo || noPhoto} alt="no photo" />
                                        <div className="card-body text-center">
                                            <p className="card-title me-2 nameProduct">{product.name}</p>
                                            <div className="card-text">
                                                <p>{product.size.join(" | ")}</p>
                                                <p>Giá: <span className="price">{Helper.formatCurrencyToVND(product.price)}</span></p>
                                            </div>
                                            <div className="text-center" >
                                                <Link className="me-2" to={`/coffee-store/product/edit/${product.id}`}>
                                                    <i className="fa-solid fa-pen-to-square fa-xl"></i>
                                                </Link>
                                                <span className="">
                                                    <i role="button" className="fa-brands fa-expeditedssl fa-xl"
                                                        onClick={() => handleRemoveProduct(product)}
                                                    ></i>
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="card-footer text-center">
                                            <small className="text-muted">{getCategoryName(product.categoryId)}</small>
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