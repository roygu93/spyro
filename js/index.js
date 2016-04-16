$(document).ready(function(){
    $('.hr').on('mousedown', function(e){
        var $dragable = $('#bottomSection'),
            startHeight = $dragable.height(),
            pY = e.pageY;

        //NOT SURE IF I NEED THIS
        // $(document).on('mouseup', function(e){
        //     $(document).off('mouseup').off('mousemove');
        // });

        $(document).on('mouseup', function(me){
            var my = (me.pageY - pY);

            var newHeight = startHeight - my;
            var bottomsTop = pY + my;

            $dragable.css({
                height: newHeight,
                top: bottomsTop
            });

            $(".sidebarBottom").css({
                height: newHeight
            });

            $("#bottomSection.content").css({
                height: newHeight
            });

        });
                
    });

    $(".multiple-family-buttons").on("click", function() {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
        }
        else {
            $(this).removeClass("active");
        }

        var parts = $(this).attr("id").split("_");
        var family = parts[1];
        var member = parts[2];

        displayData(family, member).success(function(d) {
            $("#data-vis-body").append(d[0]);
        });
    });
});

function displayData(family, member) {
    var endpoint = "dummy/family_" + family + "/" + member + ".json";

    return $.ajax({
        url: endpoint,
        method: "GET"
    });
}
