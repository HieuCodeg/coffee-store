class Helper{
    static formatCurrencyToVND(number) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(number));
    }

    static getFilename(fileUrl) {
        return fileUrl.split("/").pop().split('.')[0];
    }
}

export default Helper;