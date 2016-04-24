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
            var newTopSectionHeight = originalTopSectionHeight + my + 10;
            
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
    
    /********** Fetching JSON List to Populate Top View **********/
    //TODO: NOT SURE WHY .success won't work but .fail and .always does...
    var families, family;
    var familyDivCardID, individualName, individualRole;
    retrieveJSONList().always(function(data) { 
        console.log("Retrieved JSON List");
        // console.log(data)
        families = data.families;
        // console.log(families)
        for (num in families) {
            family = families[num];
            // console.log(family);
            
            for (familyName in family) {
                // console.log(familyName)
                familyDivCardID = "#" + familyName;
                $('.FamilyViewContent').find('.section-body').append("<div class='multiple-family-cards' id='" + familyName + "'></div>");
                $(familyDivCardID).append("<h3>"+familyName + "</h3>");

                for (individuals in family[familyName]) {
                    individualName = family[familyName][individuals].firstName + " " + family[familyName][individuals].lastName;
                    individualRole = family[familyName][individuals].role;
                    $(familyDivCardID).append("<div class='multiple-family-buttons' id='" + familyName + "-"+ individualRole + "'> " + individualName+ " </div>");
                }
            }
        }

        /********** Multiple Family Tree Button OnClick Event Handler **********/
        $(".multiple-family-buttons").on("click", function() {
            var parts = $(this).attr("id").split("-");
            var family = parts[1];
            var member = parts[2];
        
            if(!$(this).hasClass("active")) {
                $(this).addClass("active");
                var newDiv = document.createElement("div");
                newDiv.id = family + member;
            
                displayData(family, member).success(function(d) {
                    newDiv.innerHTML = d[0];
                    $("#data-vis-body").append(newDiv);
                });
            }
            else {
                $(this).removeClass("active");
                $("#" + family + member).remove();
            }            
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

function retrieveJSONList() {
    var listOfDataPath = 'dummyRepo/ListOfData.json';
    return $.ajax ({
        url:listOfDataPath,
        method:'GET'
    });
}
