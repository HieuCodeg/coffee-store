import axios from "axios";
import { PRODUCT_API_URL, SIZE_API_URL } from './common';

class SizeService {
    static getSizes() {
        return axios.get(SIZE_API_URL);
    };
    
}

export default SizeService;