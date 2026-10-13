/**
 * BÀI 5: SHOP PHỤ KIỆN ĐIỆN THOẠI MINI — GIỎ HÀNG ĐỘNG VỚI VUE.JS (CDN)
 * Sinh viên thực hiện: Lê Cường Bảo - MSSV: 6651071005
 * 
 * =========================================================================================
 * GHI CHÚ SO SÁNH QUAN TRỌNG (Yêu cầu mục 11):
 * Nếu dùng Vanilla JS, mỗi lần thêm/xoá giỏ hàng ta phải tự document.querySelector,
 * tự createElement / gán innerHTML, tính lại tổng tiền rồi cập nhật từng phần tử DOM thủ công.
 * Trong khi đó với Vue.js, Vue tự động làm điều này nhờ cơ chế REACTIVITY:
 * Khi dữ liệu mảng 'cart' hoặc biến 'tuKhoa' thay đổi, giao diện UI (số lượng giỏ hàng ở header,
 * danh sách sản phẩm trong giỏ, tổng tiền, kết quả tìm kiếm) sẽ tự động đồng bộ và render lại
 * ngay lập tức mà không cần bất kỳ thao tác can thiệp DOM thủ công nào!
 * Đây chính là tư tưởng cốt lõi: "UI = function(State / Data)".
 * =========================================================================================
 */

const { createApp } = Vue;

createApp({
    // 1. DATA: Trạng thái nguồn (Reactive State) của ứng dụng
    data() {
        return {
            // Biến ràng buộc 2 chiều với ô tìm kiếm qua v-model
            tuKhoa: '',

            // Mảng chứa các mặt hàng đã được khách hàng thêm vào giỏ
            cart: [],

            // Thông báo toast phản hồi khi thêm/xóa/thanh toán
            thongBao: '',
            hienThongBao: false,

            // Danh mục đang chọn để lọc nhanh (tất cả / ốp lưng / sạc cáp / âm thanh)
            danhMucHienTai: 'all',

            // Danh sách tối thiểu 8 sản phẩm phụ kiện điện thoại công nghệ cao
            products: [
                {
                    id: 1,
                    ten: 'ELECTRIC BLUE CASE',
                    anh: '../images/blue_case.jpg',
                    gia: 250000,
                    moTaNgan: 'Ốp lưng silicon dẻo chống sốc góc cạnh, màu xanh Electric Blue thời thượng hạn chế bám vân tay.',
                    danhMuc: 'cases',
                    tag: 'Hot Trend'
                },
                {
                    id: 2,
                    ten: 'WIRELESS CHARGER PAD',
                    anh: '../images/charger_pad.jpg',
                    gia: 350000,
                    moTaNgan: 'Đế sạc không dây chuẩn Qi 15W tản nhiệt nhôm nguyên khối, trang bị vòng LED báo trạng thái sạc.',
                    danhMuc: 'chargers',
                    tag: 'Tiện lợi'
                },
                {
                    id: 3,
                    ten: 'ACTIVE TWS EARBUDS',
                    anh: '../images/earbuds.jpg',
                    gia: 790000,
                    moTaNgan: 'Tai nghe không dây Bluetooth 5.3 chống ồn môi trường ENC, độ trễ siêu thấp chơi game mượt mà.',
                    danhMuc: 'audio',
                    tag: 'Best Seller'
                },
                {
                    id: 4,
                    ten: '65W GaN FAST CHARGER',
                    anh: '../images/fast_charger.jpg',
                    gia: 420000,
                    moTaNgan: 'Củ sạc nhanh công nghệ bán dẫn GaN 65W nhỏ gọn 3 cổng (2 Type-C + 1 USB-A) sạc cùng lúc laptop & đt.',
                    danhMuc: 'chargers',
                    tag: 'Khuyên dùng'
                },
                {
                    id: 5,
                    ten: 'BRAIDED TYPE-C CABLE',
                    anh: '../images/braided_cable.jpg',
                    gia: 140000,
                    moTaNgan: 'Cáp sạc bọc dù quân đội chịu uốn gập 20.000 lần, công suất truyền tải lên đến 100W PD.',
                    danhMuc: 'cables',
                    tag: 'Bền bỉ'
                },
                {
                    id: 6,
                    ten: 'MAGSAFE POWERBANK 10000mAh',
                    anh: '../images/magsafe_powerbank.jpg',
                    gia: 580000,
                    moTaNgan: 'Pin dự phòng từ tính lực hút 12N hít chặt lưng điện thoại, sạc nhanh không dây 15W.',
                    danhMuc: 'chargers',
                    tag: 'Cao cấp'
                },
                {
                    id: 7,
                    ten: 'SLIM CLEAR CASE PRO',
                    anh: '../images/clear_case.jpg',
                    gia: 190000,
                    moTaNgan: 'Ốp lưng trong suốt tráng gương chống ố vàng 6 tháng, viền túi khí bảo vệ cụm camera 360 độ.',
                    danhMuc: 'cases',
                    tag: 'Bán chạy'
                },
                {
                    id: 8,
                    ten: 'NOISE CANCEL HEADPHONES',
                    anh: '../images/headphones.jpg',
                    gia: 1250000,
                    moTaNgan: 'Tai nghe trùm đầu over-ear chống ồn chủ động ANC 38dB, đệm tai thoáng khí, thời lượng pin 40 giờ.',
                    danhMuc: 'audio',
                    tag: 'Âm thanh Hi-Res'
                },
                {
                    id: 9,
                    ten: 'ALUMINUM CAR MOUNT',
                    anh: '../images/car_mount.jpg',
                    gia: 220000,
                    moTaNgan: 'Giá đỡ điện thoại gắn khe gió ô tô hít nam châm N52 xoay 360 độ cực kỳ chắc chắn.',
                    danhMuc: 'accessories',
                    tag: 'Đa năng'
                }
            ]
        };
    },

    // 2. COMPUTED: Các giá trị được tính toán tự động dựa trên reactive state
    computed: {
        /**
         * cartCount: Tính tổng số lượng món đồ trong giỏ hàng.
         * Giá trị này được liên kết động lên Header qua {{ cartCount }}
         */
        cartCount() {
            return this.cart.reduce((tong, item) => tong + item.soLuong, 0);
        },

        /**
         * tongTien: Tự động tính tổng tiền của tất cả mặt hàng trong giỏ.
         * Khi mảng cart thay đổi hoặc số lượng thay đổi, tongTien tự động được tính lại ngay lập tức.
         */
        tongTien() {
            return this.cart.reduce((tong, item) => tong + (item.gia * item.soLuong), 0);
        },

        /**
         * tongTienFormatted: Định dạng tổng tiền sang chuỗi tiền tệ Việt Nam (VNĐ)
         */
        tongTienFormatted() {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.tongTien);
        },

        /**
         * danhSachLoc: Lọc danh sách sản phẩm theo từ khoá tìm kiếm 'tuKhoa' (không phân biệt hoa/thường)
         * và theo danh mục đang chọn.
         * Đây chính là minh chứng: "Giao diện hiển thị là hàm số của Dữ liệu (UI = f(data))".
         */
        danhSachLoc() {
            const tuKhoaTimKiem = this.tuKhoa.trim().toLowerCase();

            return this.products.filter(item => {
                // Lọc theo từ khóa tìm kiếm trong tên hoặc mô tả
                const hopLeTuKhoa = !tuKhoaTimKiem ||
                    item.ten.toLowerCase().includes(tuKhoaTimKiem) ||
                    item.moTaNgan.toLowerCase().includes(tuKhoaTimKiem);

                // Lọc theo tab danh mục nếu có chọn
                const hopLeDanhMuc = this.danhMucHienTai === 'all' || item.danhMuc === this.danhMucHienTai;

                return hopLeTuKhoa && hopLeDanhMuc;
            });
        }
    },

    // 3. METHODS: Các hàm thực thi hành động người dùng
    methods: {
        /**
         * formatTien: Hàm tiện ích định dạng số tiền sang chuẩn VNĐ
         * @param {number} soTien 
         */
        formatTien(soTien) {
            return new Intl.NumberFormat('vi-VN').format(soTien) + ' ₫';
        },

        /**
         * themVaoGio: Nhận một object sản phẩm và đưa vào mảng cart
         * Nếu sản phẩm đã có trong giỏ hàng thì tăng số lượng lên 1
         * @param {Object} sanPham 
         */
        themVaoGio(sanPham) {
            const timThay = this.cart.find(item => item.id === sanPham.id);

            if (timThay) {
                timThay.soLuong += 1;
            } else {
                this.cart.push({
                    id: sanPham.id,
                    ten: sanPham.ten,
                    anh: sanPham.anh,
                    gia: sanPham.gia,
                    soLuong: 1
                });
            }

            this.hienThongBaoToast(`Đã thêm "${sanPham.ten}" vào giỏ hàng!`);
        },

        /**
         * tangSoLuong: Tăng số lượng một món trong giỏ hàng
         * @param {number} index 
         */
        tangSoLuong(index) {
            if (this.cart[index]) {
                this.cart[index].soLuong += 1;
            }
        },

        /**
         * giamSoLuong: Giảm số lượng một món trong giỏ, nếu giảm về 0 thì tự xoá khỏi giỏ
         * @param {number} index 
         */
        giamSoLuong(index) {
            if (this.cart[index]) {
                if (this.cart[index].soLuong > 1) {
                    this.cart[index].soLuong -= 1;
                } else {
                    this.xoaKhoiGio(index);
                }
            }
        },

        /**
         * xoaKhoiGio: Xóa sản phẩm khỏi mảng cart dựa theo vị trí index
         * @param {number} index 
         */
        xoaKhoiGio(index) {
            if (index >= 0 && index < this.cart.length) {
                const spDaXoa = this.cart[index];
                this.cart.splice(index, 1);
                this.hienThongBaoToast(`Đã xóa "${spDaXoa.ten}" khỏi giỏ hàng.`);
            }
        },

        /**
         * xoaToanBoGio: Làm trống hoàn toàn giỏ hàng
         */
        xoaToanBoGio() {
            if (this.cart.length > 0 && confirm('Bạn có chắc muốn xoá toàn bộ giỏ hàng?')) {
                this.cart = [];
                this.hienThongBaoToast('Đã dọn dẹp sạch giỏ hàng.');
            }
        },

        /**
         * thanhToan: Xử lý đặt hàng / checkout
         */
        thanhToan() {
            if (this.cart.length === 0) return;

            const tong = this.tongTienFormatted;
            const soLuong = this.cartCount;

            alert(`🎉 Chúc mừng bạn đã đặt hàng thành công!\n\n• Tổng số lượng: ${soLuong} sản phẩm\n• Tổng thanh toán: ${tong}\n\nĐơn hàng đang được đóng gói và chuyển phát nhanh đến bạn.`);
            this.cart = [];
        },

        /**
         * datDanhMuc: Đặt danh mục lọc nhanh
         */
        datDanhMuc(danhMuc) {
            this.danhMucHienTai = danhMuc;
        },

        /**
         * hienThongBaoToast: Hiển thị thanh thông báo nhỏ phản hồi tức thì
         */
        hienThongBaoToast(noiDung) {
            this.thongBao = noiDung;
            this.hienThongBao = true;
            clearTimeout(this.toastTimer);
            this.toastTimer = setTimeout(() => {
                this.hienThongBao = false;
            }, 3000);
        }
    }
}).mount('#app');
