import axios from "axios";
import { PRODUCT_API_URL } from './common';

class ProductService {
    static getProducts() {
        return axios.get(PRODUCT_API_URL);
    };
    static getEditProducts(productid) {
        return axios.get(`${PRODUCT_API_URL}/${productid}`);
    };
    static editProduct(product) {
        return axios.put(`${PRODUCT_API_URL}/${product.id}`, product);
    };
    static createProduct(product) {
        return axios.post(PRODUCT_API_URL, product);
    };
    static removeProduct(productid) {
        return axios.delete(`${PRODUCT_API_URL}/${productid}`)
    }
}

export default ProductService;
