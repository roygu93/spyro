$(document).ready(function(){
    var mouseDownOccurred = false;

    $('#divider').on('mousedown', function(e){
        e.preventDefault();
        var $dragable = $('#bottomSection'),
            startHeight = $dragable.height(),
            pY = e.pageY;

            mouseDownOccurred = true;

        $(document).on('mouseup', function(me){
            if (mouseDownOccurred) {
                me.preventDefault();
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

                mouseDownOccurred = false;
            }
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

    $("#file-view-icon").on("click", function() {
        $("#file-view-wrap").show();
        $("#family-view-wrap").hide();
    });
     
    $("#family-view-icon").on("click", function() {
        $("#file-view-wrap").hide();
        $("#family-view-wrap").show();
    });
});

function displayData(family, member) {
    var endpoint = "dummy/family_" + family + "/" + member + ".json";

    return $.ajax({
        url: endpoint,
        method: "GET"
    });
}
