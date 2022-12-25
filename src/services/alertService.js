import Swal from "sweetalert2";

class AlertService {
    static confirmRemove(name,check) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success ms-2',
              cancelButton: 'btn btn-danger me-2'
            },
            buttonsStyling: false
        })
          
        swalWithBootstrapButtons.fire({
        title: `Bạn chắc chắn muốn xóa "${name}"?`,
        text: "Bạn sẽ không thể khôi phục lại sản phẩm!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Hủy bỏ!',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
            'Đã xóa!',
            `Sản phẩm "${name}" đã bị xóa.`,
            'success'
            );
        } 
        })
    }
}

export default AlertService;