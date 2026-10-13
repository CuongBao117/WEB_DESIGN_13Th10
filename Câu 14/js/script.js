$(document).ready(function () {
    var $switch = $('#myonoffswitch');
    var $imgOn = $('img[src*="on.png"]');
    var $imgOff = $('img[src*="off.png"]');

    function applyTheme(isOn) {
        if (isOn) {
            // Chuyển sang theme nền sáng (On)
            $imgOn.addClass('fadeEffect');
            $imgOff.removeClass('fadeEffect');
            $('body').css('background-color', '#eaebeb');
        } else {
            // Chuyển sang theme nền tối (Off)
            $imgOff.addClass('fadeEffect');
            $imgOn.removeClass('fadeEffect');
            $('body').css('background-color', '#121212');
        }
    }

    // Khởi tạo theme đồng bộ với trạng thái switch hiện tại
    applyTheme($switch.is(':checked'));

    // Lắng nghe sự kiện chuyển đổi switch On/Off
    $switch.on('change', function () {
        applyTheme($(this).is(':checked'));
    });
});
