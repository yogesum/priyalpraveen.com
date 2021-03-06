var getDaysPast = function() {
    var oneDay = 1000 * 60 * 60 * 24;
    var wedDate = new Date(2017, 11, 12);
    var currentDate = new Date();
    var getDays = Math.round((currentDate.getTime() - wedDate.getTime()) / oneDay);
    $('.days').text(getDays);
    $('.hours').text(('0' + currentDate.getHours()).slice(-2));
    $('.minutes').text(('0' + currentDate.getMinutes()).slice(-2));
    $('.seconds').text(('0' + currentDate.getSeconds()).slice(-2));
    console.log(getDaysPast, 100);
}

function postcomment() {
    var e = $("#name").val(),
        t = $("#comment").val();
    if (!e || !t) return $("#error").html('<div class="text-danger" style="">Name and Comment are mandatory</div>'), setTimeout(function() {
        $("#error").html("")
    }, 5e3);
    var n = $("input[name='side']:checked").val() || "";
    $("#name").val(""), $("#comment").val(""), $("input[name='side']").prop("checked", !1), db.ref("comments/comment" + count).set({
        name: e,
        comment: t,
        likes: 0,
        side: n,
        isApproved: !1
    }).then(function() {
        $("#error").html('<div class="text-success">Your comment is posted and waiting for approval</div>'), setTimeout(function() {
            $("#error").html("")
        }, 5e3)
    })["catch"](function() {
        $("#error").html('<div class="text-danger">Error Occurred</div>'), setTimeout(function() {
            $("#error").html("")
        }, 5e3)
    })
}

function showComments(e, t) {
    for (var n = (Object.keys(e), ""), o = t - 1; o > -1; o--) {
        var a = e["comment" + o];
        a.isApproved && (n += ['<div class="item">', "<blockquote>", "<p> " + a.comment + "</p>", "<small><cite>" + a.name + '</cite> <span class="' + (!a.side && "hidden") + '">(' + a.side + ")</span></small>", "</blockquote>", "</div>"].join(" "))
    }
    $("#showComment").click(function() {
        $(this).hide(), $("#commentSection").removeClass("hidden").addClass("show")
    }), $("#comments").html(n), $(".item").first().addClass("active"), $("#myCarousel").carousel()
}

function AnimateRotate(e, t) {
    var n = $("#no1");
    $({
        deg: 0
    }).animate({
        deg: e
    }, {
        duration: t,
        step: function(e) {
            n.css({
                transform: "rotate(" + e + "deg)"
            })
        }
    })
}
var config = {
    apiKey: "AIzaSyBxUy0ciqWkTBPNhTynV5TwMXiIIslGWcQ",
    authDomain: "test-a74b8.firebaseapp.com",
    databaseURL: "https://test-a74b8.firebaseio.com",
    projectId: "test-a74b8",
    storageBucket: "test-a74b8.appspot.com",
    messagingSenderId: "827877571148"
};
if (firebase) {
    firebase.initializeApp(config);
    var db = firebase.database()
}
var count = 1,
    comments = {};
! function() {
    var e = db.ref("comments");
    e.on("value", function(e) {
        comments = e.val(), count = e.numChildren(), showComments(comments, count)
    })
}(), $(document).ready(function() {
    var e = 3e3;
    $("#no1").fadeIn("slow", function() {
        AnimateRotate(360, e), setTimeout(function() {
            $("#no1").fadeOut(500), $("#no2").fadeIn(1e3), setTimeout(function() {
                $("#no2").fadeOut(), $("#no3").fadeIn(500), setTimeout(function() {
                    $("#no3").animate({
                        color: "#fff",
                        "font-weight": 400,
                        "font-size": "20px",
                        position: "static"
                    }, 600)
                }, 1e3)
            }, 2e3)
        }, e)
    })
});
setInterval(getDaysPast(), 500);