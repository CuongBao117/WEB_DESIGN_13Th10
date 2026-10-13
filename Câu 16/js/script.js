$(document).ready(function () {
    // Khởi tạo datepicker nếu có thư viện jQuery UI
    if ($.fn.datepicker) {
        $("#datepicker").datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            yearRange: "1900:2030"
        });
    }

    // Xử lý thêm hàng vào table khi nhấn Add Row
    $(".add-row").on("click", function () {
        var name = $("#name").val().trim();
        var email = $("#email").val().trim();
        var birthdate = $("#datepicker").val().trim();

        // Kiểm tra trường Name
        if (name === "") {
            alert("Vui lòng nhập Name!");
            $("#name").focus();
            return;
        }

        // Kiểm tra trường Email
        if (email === "") {
            alert("Vui lòng nhập Email!");
            $("#email").focus();
            return;
        }

        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Email không đúng định dạng! Vui lòng nhập lại (ví dụ: user@example.com).");
            $("#email").focus();
            return;
        }

        // Kiểm tra trường Birthdate
        if (birthdate === "") {
            alert("Vui lòng nhập hoặc chọn Birthdate!");
            $("#datepicker").focus();
            return;
        }

        // Thêm hàng mới vào tbody
        var newRow = "<tr>" +
            "<td><input type='checkbox' name='record'></td>" +
            "<td>" + $("<div>").text(name).html() + "</td>" +
            "<td>" + $("<div>").text(email).html() + "</td>" +
            "<td>" + $("<div>").text(birthdate).html() + "</td>" +
            "</tr>";

        $("table tbody").append(newRow);

        // Reset dữ liệu trong các input form
        $("#name").val("");
        $("#email").val("");
        $("#datepicker").val("");
    });

    // Xử lý xóa hàng đã tích chọn khi nhấn Delete Row
    $(".delete-row").on("click", function () {
        var $checkedRecords = $("table tbody input[name='record']:checked");

        if ($checkedRecords.length === 0) {
            alert("Vui lòng tích chọn ít nhất một hàng để xóa!");
            return;
        }

        $checkedRecords.each(function () {
            $(this).closest("tr").remove();
        });
    });
});
