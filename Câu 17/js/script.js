$(document).ready(function () {
    // Xử lý hiệu ứng Accordion khi click vào tiêu đề h3
    $('h3').on('click', function () {
        var $content = $(this).next('.box');

        // Ẩn tất cả các nội dung khác (đảm bảo mỗi lần chỉ mở 1 nội dung)
        $('.box').not($content).slideUp(300);

        // Hiển thị/ẩn nội dung tiếp theo tương ứng với tiêu đề vừa click
        $content.slideToggle(300);
    });
});
