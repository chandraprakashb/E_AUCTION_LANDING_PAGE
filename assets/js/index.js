setTimeout(()=>{PageLaod("notices")} , 1000)

$(".download-btn").click(()=>{PageLaod('donloads')})

$(".nav-time").click(function(){
    $(".nav-time").removeClass('selected');
    $(this).addClass('selected');
    PageLaod($(this).data("page-link"));
});
