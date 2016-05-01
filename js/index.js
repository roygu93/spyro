$(document).ready(function(){
    var mouseDownOccurred = false;
    $("#family-view-icon").css('background-color', '#4b9188'); //darken - because already on the family view

    /********** Top Section Sidebar **********/
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
                $(familyDivCardID).append("<h3>" + familyName + "</h3>");
                addToSelectFamilyDropDown(familyName);

                for (individuals in family[familyName]) {
                    individualName = family[familyName][individuals].firstName + " " + family[familyName][individuals].lastName;
                    individualRole = family[familyName][individuals].role;
                    $(familyDivCardID).append("<div class='multiple-family-buttons' id='mfamilyview_" + familyName + "-" + individualRole + "'> " + individualName+ " </div>");
                    
                    $('.FileDirectoryContent').find('#dashboardTableBody').append("<tr id='fileview_" + familyName + "-" + individualRole + "' class='fileview-table-rows'></tr>");
                    $("#fileview_" + familyName + "-" + individualRole).append("<td>" + individualName + "</td> <td>" + familyName + "</td> <td> " + individualRole + 
                                "</td><td><div class='fileview-checkmark'></div>");
                    
                }
            }
        }
        
        /********** Multiple Family Tree Button OnClick Event Handler **********/
        $(".multiple-family-buttons").on("click", toggleActiveButtons);
        
        /********** File View Button OnClick Event Handler **********/
        $(".fileview-table-rows").on("click", toggleActiveButtons);
        
        $("#dashboardTable").tablesorter();
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

//Synchronizes buttons between Family View and File Directory so that when a family member is clicked, the 
//same member in the other view is also clicked
function toggleActiveButtons() {
    var parts = $(this).attr("id").split("-");
    var commonId = $(this).attr("id").split("_")[1];
    var family = parts[1];
    var member = parts[2];


    if(!$("#mfamilyview_" + commonId).hasClass("clicked") && !$("#fileview_" + commonId).hasClass("clicked")) {
        $('#mfamilyview_' + commonId).addClass("clicked");
        $("#fileview_" + commonId).addClass("clicked");
        $("#fileview_" + commonId).find(".fileview-checkmark").show();

        var newDiv = document.createElement("div");
        newDiv.id = family + member;

        displayData(family, member).success(function(d) {
            newDiv.innerHTML = d[0];
            $("#data-vis-body").append(newDiv);
        });
    }
    else {
        $("#mfamilyview_" + commonId).removeClass("clicked");
        $("#fileview_" + commonId).removeClass("clicked");
        $("#fileview_" + commonId).find(".fileview-checkmark").hide();

        $("#" + family + member).remove();
    } 

    // If the Bar Graph Visualization div is not currently displaying then display it
    // TODO: need to hide and display default no viz message when no individuals are selected
    if($("#bottomSection").find(".BarGraphViz").css("display") == "none"){
        $("#bottomSection").find(".BarGraphViz").show()
        $("#bar-graph-viz").css('background-color', '#879e4e'); //darken 
        $("#bio-graph-viz").css('background-color', '#A9C662'); //reset 
    }

}

function addToSelectFamilyDropDown(familyName) {
    var htmlString = "<li><label class='select-family-labels' onClick='displayFamilyCard(this)'><input type='checkbox' class='select-family-checkboxes'/>" + familyName + "</label></li>";
    $('#selectFamily').find('.familyDropdown').append(htmlString);
    // TODO: Fix overflow height issue
}


function displayFamilyCard(htmlElement){
    var familyName =  "#" + htmlElement.innerText;
    
    if(htmlElement.children[0].checked) {
        $(familyName).css("display", "inline-block");
    } else{
         $(familyName).css("display", "none");
    }
    
    if($(".select-family-checkboxes:checked").length != 0) {
        $(".family-view-initial-msg").hide(); //TODO: MODIFY
    } else {
        $(".family-view-initial-msg").show(); //TODO: MODIFY
    }
    
}

