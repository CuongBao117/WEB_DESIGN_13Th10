$(document).ready(function () {
    // Kích hoạt tab đầu tiên theo mặc định
    $('.tab li:first-child').addClass('active');
    $('.tab-content .tab-item:first-child').show();

    // Xử lý sự kiện click chuyển tab
    $('.tab li a').on('click', function (e) {
        e.preventDefault();

        // Đổi active cho tiêu đề tab
        $('.tab li').removeClass('active');
        $(this).parent().addClass('active');

        // Ẩn nội dung cũ và hiển thị nội dung tab tương ứng
        $('.tab-content .tab-item').hide();
        var targetTab = $(this).attr('href');
        $(targetTab).fadeIn(200);
    });
});
