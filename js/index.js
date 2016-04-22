$(document).ready(function(){
    var mouseDownOccurred = false;

    $('.hr').on('mousedown', function(e){
        e.preventDefault();
        var $dragable = $('#bottomSection'),
            startHeight = $dragable.height(),
            $topSection = $('.sidebarTop'),
            originalTopSectionHeight = $topSection.height(),
            pY = e.pageY;

            mouseDownOccurred = true;

        $(document).on('mouseup', function(me){
            $(document).off('mouseup').off('mousemove');
        });

        $(document).on('mousemove', function(me){
            var my = (me.pageY - pY);
            var newHeight = startHeight - my;
            var bottomsTop = pY + my;
            var newTopSectionHeight = originalTopSectionHeight + my;
            
            $dragable.css({
                height: newHeight,
                top: bottomsTop
            });

            $('.sidebarBottom').css({
                height: newHeight
            });

            $('#bottomSection').find('.content').css({
                height: newHeight
            });

            $('#topSection').find('.content').css({
                height:newTopSectionHeight
            });

            $(".sidebarTop").css({
                height:newTopSectionHeight
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
