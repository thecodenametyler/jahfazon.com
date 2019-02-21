$(document).ready(function (){
    $(".js-scrolltosection").click(function (e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $("#intro").offset().top
        }, 300);
    });
});