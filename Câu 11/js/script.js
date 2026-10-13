$(document).ready(function () {
    $('#fileupload').on('change', function () {
        var file = this.files && this.files[0] ? this.files[0] : null;
        var fullPath = $(this).val();

        if (file || fullPath) {
            var fullFileName = file ? file.name : fullPath.split('\\').pop().split('/').pop();
            var lastDotIndex = fullFileName.lastIndexOf('.');
            var fileName = lastDotIndex !== -1 ? fullFileName.substring(0, lastDotIndex) : fullFileName;
            var fileExt = lastDotIndex !== -1 ? fullFileName.substring(lastDotIndex + 1) : '';

            // Cập nhật tên hiển thị trong khung .filename
            $('.filename').text(fullFileName);

            // Hiển thị chi tiết tên file và phần mở rộng
            $('#file-details').html(
                '<p><strong>Tên file:</strong> ' + $('<div>').text(fileName).html() + '</p>' +
                '<p><strong>Phần mở rộng:</strong> ' + (fileExt ? '.' + $('<div>').text(fileExt).html() : 'Không có') + '</p>'
            ).fadeIn();
        } else {
            $('.filename').text('Ex:sample.jpg');
            $('#file-details').hide();
        }
    });
});
