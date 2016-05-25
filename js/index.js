
$(document).ready(function(){
    var height = $(window).width();
    $(".banner").height(height *.14);
    
    $(window).resize(function() {
        height = $(window).width();
        $(".banner").height(height * 0.14);
    });
