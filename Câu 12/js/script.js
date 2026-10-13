$(document).ready(function () {
    $('.checkme').on('change', function () {
        var $card = $(this).closest('.checkbox-card');
        if ($(this).is(':checked')) {
            $card.find('.passport-box').stop(true, true).slideDown();
        } else {
            $card.find('.passport-box').stop(true, true).slideUp();
        }
    });
});
