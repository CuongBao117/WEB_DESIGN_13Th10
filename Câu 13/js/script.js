$(document).ready(function () {
    $('.password-show').on('click', function () {
        var $passwordInput = $(this).siblings('.input-control');

        if ($passwordInput.attr('type') === 'password') {
            $passwordInput.attr('type', 'text');
            $(this).removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            $passwordInput.attr('type', 'password');
            $(this).removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });
});
