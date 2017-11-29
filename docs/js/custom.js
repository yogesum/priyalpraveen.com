// Initialize Firebase
var config = {
    apiKey: "AIzaSyBxUy0ciqWkTBPNhTynV5TwMXiIIslGWcQ",
    authDomain: "test-a74b8.firebaseapp.com",
    databaseURL: "https://test-a74b8.firebaseio.com",
    projectId: "test-a74b8",
    storageBucket: "test-a74b8.appspot.com",
    messagingSenderId: "827877571148"
};
firebase.initializeApp(config);
var db = firebase.database();
var count = 1;
var comments = {};
(function() {
    var starCountRef = db.ref('comments');
    starCountRef.on('value', function(snapshot) {
        comments = snapshot.val();
        count = snapshot.numChildren();
        showComments(comments, count);
    });
})();
function postcomment() {
    var name = $('#name').val();
    var comment = $('#comment').val();
    if (!name || !comment) {
        $('#error').html('<div class="text-danger" style="">Name and Comment are mandatory</div>');
        return setTimeout(function() { $('#error').html('') }, 5000);
    }
    var side = $("input[name='side']:checked").val() || '';
    $('#name').val('');
    $('#comment').val('');
    $("input[name='side']").prop('checked', false);
    db.ref('comments/comment' + count).set({
        name: name,
        comment: comment,
        likes: 0,
        side: side,
        isApproved: false
    }).then(function() {
        $('#error').html('<div class="text-success">Your comment is posted and waiting for approval</div>');
        setTimeout(function() { $('#error').html('') }, 5000);
    }).catch(function() {
        $('#error').html('<div class="text-danger">Error Occurred</div>');
        setTimeout(function() { $('#error').html('') }, 5000);
    });
}

function showComments(comments, len) {
    var keys = Object.keys(comments);
    var html = '';
    for(var i=0;i < len;i++) {
        var com = comments[keys[i]];
        if(!com.isApproved) continue;
        html += [
            '<div class="item">',
            '<blockquote>',
            '<p> ' + com.comment + '</p>',
            '<small><cite>' + com.name + '</cite> <span class="'+ (!com.side && "hidden") +'">('+ com.side +')</span></small>',
            '</blockquote>',
            '</div>'
        ].join(' ');
    }
    $('#showComment').click(function() {
        $(this).hide();
        $('#commentSection').removeClass('hidden').addClass('show');
    });
    $("#comments").html(html);
    $('.item').first().addClass('active');
    $('#myCarousel').carousel();
}

$("#bars").click(function() {
    if ($(this).hasClass('closed')) {
        $(this).removeClass('closed').addClass('open').animate({ left: "280px" }, 400);
        $('#drawer').show().animate({ left: "0" }, 400);
    } else {
        $(this).removeClass('open').addClass('closed').animate({ left: "0" }, 400);
        $('#drawer').animate({ left: "-280px" }, 400);
    }
});

$('body').click(function(event) {
    console.log($(event.target).is('div#bars'));
    if ($(event.target).is('div#bars')) return;
    $('#drawer').animate({ left: "-280px" }, 400);
    $('#bars').addClass('closed').animate({ left: "0" }, 400);
});

$(document).ready(function() {
    var time = 3000;
    $('#no1').fadeIn('slow', function() {
        AnimateRotate(360, time);
        setTimeout(function() {
            $('#no1').fadeOut(500);
            $('#no2').fadeIn(1000);
            setTimeout(function() {
                $('#no2').fadeOut();
                $('#no3').fadeIn(500);
                setTimeout(function() {
                    $('#no3')
                        .animate({ 'color': '#fff', 'font-weight': 400, 'font-size': '20px', 'position': 'static' }, 600);
                }, 1000);
            }, 2000);
        }, time);
    });
});

function AnimateRotate(d, time){
    var elem = $("#no1");

    $({deg: 0}).animate({deg: d}, {
        duration: time,
        step: function(now) {
            elem.css({
                transform: "rotate(" + now + "deg)"
            });
        }
    });
}