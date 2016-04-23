$(document).ready(function(){
    var mouseDownOccurred = false;

    /********** Top Section Sidebar **********/
    $("#file-view-icon").on("click", function() {
        if ($(".FileDirectoryContent").is(':visible') == false) {
            $(".FileDirectoryContent").show();
            $(".FamilyViewContent").hide();
            $("#family-view-icon").css('background-color', '#98CBC3'); //reset
            $("#file-view-icon").css('background-color', '#4b9188'); //darken
        } else {
            $(".FileDirectoryContent").hide();
            $("#file-view-icon").css('background-color', '#98CBC3'); //reset

        }
    });
     
    $("#family-view-icon").on("click", function() {
        if ($(".FamilyViewContent").is(':visible') == false) {
            $(".FamilyViewContent").show();
            $(".FileDirectoryContent").hide();
            $("#family-view-icon").css('background-color', '#4b9188'); //darken
            $("#file-view-icon").css('background-color', '#98CBC3'); //reset
        } else {
            $(".FamilyViewContent").hide();
            $("#family-view-icon").css('background-color', '#98CBC3'); //reset
        }
    });

    /********** Bottom Section Sidebar **********/
    $("#bio-graph-viz").on("click", function() {
        if ($(".BioGraphViz").is(':visible') == false) {
            $(".BioGraphViz").show();
            $(".BarGraphViz").hide();
            $("#bio-graph-viz").css('background-color', '#879e4e'); //darken 
            $("#bar-graph-viz").css('background-color', '#A9C662'); //reset
        } else {
            $(".BioGraphViz").hide();
            $("#bio-graph-viz").css('background-color', '#A9C662'); //reset

        }
    });
     
    $("#bar-graph-viz").on("click", function() {
        if ($(".BarGraphViz").is(':visible') == false) {
            $(".BarGraphViz").show();
            $(".BioGraphViz").hide();
            $("#bar-graph-viz").css('background-color', '#879e4e'); //darken
            $("#bio-graph-viz").css('background-color', '#A9C662'); //reset
        } else {
            $(".BarGraphViz").hide();
            $("#bar-graph-viz").css('background-color', '#A9C662'); //reset
        }
    });


    /********** Divider Bar actions **********/
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

    /********** Multiple Family Tree Button Selection **********/
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
