$("#bars").click(function() {
    if ($(this).hasClass('closed')) {
        $(this).removeClass('closed').addClass('open').animate({ left: "280px" }, 400);
        $('#drawer').show().animate({ left: "0" }, 400);
        $(this).html('&times');
    } else {
        $(this).removeClass('open').addClass('closed').animate({ left: "0" }, 400);
        $('#drawer').animate({ left: "-280px" }, 400);
        $(this).html('&#9776;');
    }
});

$('body').click(function(event) {
    if ($(event.target).is('div#bars')) return;
    $('#drawer').animate({ left: "-280px" }, 400);
    $('#bars').addClass('closed').animate({ left: "0" }, 400).html('&#9776;');
});
