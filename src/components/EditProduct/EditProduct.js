import React, { useState, useEffect } from "react";
import Loading from './../Loading/Loading';
import CategoryService from './../../services/categoryService';
import { Link, useParams } from 'react-router-dom';
import SizeService from './../../services/SizeService';
import { toast } from "react-toastify";
import ProductService from './../../services/productService';
import noPhoto from "../../assets/images/noPhoto.png";
import FileHelper from './../../helper/FileHelper';
import Helper from './../../helper/Helper';

var imageFile = null;
var checkChangePhoto = false;
var oldPhoto;
function EditProduct() {
    const {productId} = useParams();
    const [state,setState] = useState({
        loading: false,
        product:  {},
        categories: [],
        sizes: [],
        errorMessage: ""
    })

    useEffect(() => {
        try {
            setState({...state, loading: true});
            async function getData() {
                let resProduct = await ProductService.getEditProducts(productId);
                let resCategoris = await CategoryService.getCategories();
                let resSizes = await SizeService.getSizes();
                oldPhoto = resProduct.data.photo;
                setState({
                    ...state,
                    loading: false,
                    categories: resCategoris.data,
                    sizes: resSizes.data,
                    product: resProduct.data
                })
            }
            getData();
        } catch (error) {
            
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (size.length === 0) {
                toast.error('Bạn chưa chọn size!');
                return;
            }
            if(!photo){
                toast.error('Vui lòng chọn ảnh!');
                return;
            }
            setState({ ...state, loading: true });
            let newProduct = {...product};
            let photoUrl;
            if (checkChangePhoto) {
                let fileName = Helper.getFilename(oldPhoto);
                await FileHelper.destroyImage(fileName);
                photoUrl = await handleUploadPhoto();
                if (photoUrl) {
                    newProduct.photo = photoUrl;
                } else {
                    toast.error('Vui lòng chọn ảnh!');
                    return;
                }
            } 

            async function editProduct() {
                let resProductEdit = await ProductService.editProduct(newProduct);
                if (resProductEdit.data) {
                   toast.success(`${resProductEdit.data.name} cập nhật thành công`);
                   checkChangePhoto = false;
                   setState({
                    ...state,
                    loading: false,
                    product : resProductEdit.data
                })
                }
            }
            editProduct();
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleInput = (e) => {
        setState({
            ...state,
            product: {
                ...product,
                [e.target.name]: e.target.value
            }
        })
    }
    const handleCheck = (value) => {
        let tamp = [...size];
        if (size.includes(value)) {
            tamp = size.filter(item => item !== value)
        } else {
            tamp.push(value);
        }
        setState({
            ...state,
           product: {
            ...product,
            size: tamp
           }
        })
    }

   

    const handleChangePhoto = (e) => {
        imageFile = e.target.files[0];
        let fakePhotoUrl = URL.createObjectURL(e.target.files[0]);
        if (fakePhotoUrl) {
            checkChangePhoto = true;
        }
        setState({
            ...state,
            product: {
                ...product,
                photo: fakePhotoUrl
            }
        })
    }

    const handleUploadPhoto = async () => {
        try {
            let uploadResult = await FileHelper.uploadImage(imageFile);
            if (uploadResult && uploadResult.data) {
                imageFile = null;
                toast.success("Tải ảnh thành công!");
                return uploadResult.data.url;
            } else {
                toast.error("Tải ảnh không thành công");
            }
        } catch (error) {
            toast.error("Tải ảnh thất bại!");
        }
    }

    const { loading, categories, product, sizes } = state;
    const { id, name, description, price, photo, size } = product;

    useEffect(() => {
        return ( () => {
            photo && URL.revokeObjectURL(photo)
        })
    },[photo])

    return (
        <>
            <section className="product-info my-2">
                <div className="container">
                    <h3 className="me-2 text-success">Edit Product</h3>
                    <p>Ipsum elit nulla tempor adipisicing labore occaecat nulla veniam. Eu nulla nulla culpa magna proident occaecat elit culpa non culpa. Consequat dolore est voluptate pariatur laborum aute labore culpa ipsum ad ipsum veniam sunt. Voluptate ex excepteur amet minim anim ullamco occaecat pariatur quis consectetur.</p>
                </div>
            </section>
            <section className="create-product">
                {
                    loading ? <Loading></Loading> : (
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                <form  onSubmit={handleSubmit}>
                                        <div className="mb-2">
                                            <input type="text" name="name" className="form-control form-control-sm" placeholder="Name"
                                                onInput={handleInput}
                                                value={name}
                                                required
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <input type="number" min={100000} name="price" className="form-control form-control-sm" placeholder="Price"
                                                onInput={handleInput}
                                                value={price}
                                                required
                                            />
                                        </div>
                                        {/* <div className="mb-2">
                                            <input type="url" name="photo" className="form-control form-control-sm" placeholder="Photo URL"
                                                onInput={handleInput}
                                                value={photo}
                                                required
                                            />
                                        </div> */}
                                        <div className="mb-2 d-flex">
                                        <label className="form-label me-2">Size: </label>
                                            {
                                                sizes.map((item) => (
                                                    <div key={item.id} className="form-check mb-2 me-2">
                                                        <input className="form-check-input" 
                                                                value={item.name} type="checkbox" 
                                                                name="size"
                                                                checked = {size.includes(item.name)}
                                                                onChange={() => handleCheck(item.name)}
                                                                />
                                                        <label className="form-check-label">{item.name}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="form-floating mb-2">
                                            <textarea className="form-control" name="description" placeholder="Leave a comment here"
                                                id="description" style={{ height: '100px' }} 
                                                onInput={handleInput}
                                                value={description}
                                                required
                                            />
                                            <label htmlFor="description">Description</label>
                                        </div>
                                        <div className="mb-2">
                                            <select name="categoryId" className="form-control form-control-sm form-select" onChange={handleInput}>
                                                {
                                                    categories.map((cat) => (
                                                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <button type="submit" className="btn btn-success btn-sm me-2">Lưu thay đổi</button>
                                            <Link className="btn btn-outline-dark btn-sm" to={"/coffee-store"}>Quay về</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column align-items-center">
                                            <img className="photo-lg mb-2" role="button" src={ photo || noPhoto} alt="" 
                                                onClick={() => (document.querySelector("#photoUpload").click())}
                                            />
                                            <input type="file" accept="image/*" id="photoUpload" className="d-none" 
                                                onChange={handleChangePhoto}
                                            />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>
        </>

    )
}

export default EditProduct;