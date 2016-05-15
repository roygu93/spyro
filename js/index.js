var synchronizedScrolling = true; //TODO: need to connect this to a button

$(document).ready(function(){
    var mouseDownOccurred = false;
    var multipleFamilyCardsBackgroundColor = ["#95D7CF","#BCD98D", "#FFFF89"]
    var bottomSectionHeightBeforeCollapse= 0;
    $("#family-view-icon").css('background-color', '#4b9188'); //darken - because already on the family view
    document.getElementById("collapseButtonText").setAttribute('data-value', '↑');

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
        $(".data-vis-initial-msg").hide();
        
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
        $(".data-vis-initial-msg").hide();
        
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
            if($("#topSection").hasClass("collapse in")){

                var my = (me.pageY - pY);
                var newHeight = startHeight - my;
                var bottomsTop = pY + my;
                var newTopSectionHeight = originalTopSectionHeight + my; // + 10
                
                if (bottomsTop < window.innerHeight - 45) {
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

                    $(".biograph-data").css({
                        height: "calc(97% - 75px)"
                    });        
                }
                
            }
            
        });         
    });

    $(".collapseButton").on('click', function (me) {
        if($("#topSection").hasClass("collapse in")){
            //meaning the top section is about to be displayed - replace with 100% height
            var fillWindow = window.innerHeight - parseInt($('#divider').css("border-top-width")) - parseInt($('.footer').css("height"))

            //saving the old value
            bottomSectionHeightBeforeCollapse = $('#bottomSection').find('.content').css("height")

            // $('#bottomSection').css({
            //     'margin-top': "50px"
            // });

            $('#bottomSection').find('.content').css({
                height: fillWindow
            });

            $('.sidebarBottom').css({
                height: fillWindow
            });

            $("#collapseButtonText").html("&#8681;");
            // document.getElementById("collapseButtonText").setAttribute('data-value', '↓');
            
            $('.hr').css({
                cursor: "auto"
            });


        } else {
            //meaining the top section is collapsed - replace with original height
            // $('#bottomSection').css({
            //     'margin-top': "0px"
            // });

            $('#bottomSection').find('.content').css({
                height: bottomSectionHeightBeforeCollapse
            });

            $('.sidebarBottom').css({
                height: bottomSectionHeightBeforeCollapse
            });

            $("#collapseButtonText").html("&#8679;");
            // document.getElementById("collapseButtonText").setAttribute('data-value', '↑');
            $('.hr').css({
                cursor: "row-resize"
            });
        }
    });
    
    
    /********** Fetching JSON List to Populate Top View **********/
    //TODO: NOT SURE WHY .success won't work but .fail and .always does...
    var families, family;
    var familyDivCardID, individualName, individualRole, infected;
    var mfBackgroundColor;
    var count = 0;
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
                mfBackgroundColor = multipleFamilyCardsBackgroundColor[count % multipleFamilyCardsBackgroundColor.length]
                $('.FamilyViewContent').find('.section-body').append("<div class='multiple-family-cards' id='" + familyName + "' style='background-color:"+ mfBackgroundColor +"'></div>");
                $(familyDivCardID).append("<h3>" + familyName + "</h3>");
                addToSelectFamilyDropDown(familyName);

                count++

                for (individuals in family[familyName]) {
                    individualRole = family[familyName][individuals].role;
                    infected = family[familyName][individuals].infected;
                    
                    $(familyDivCardID).append("<div class='" + individualRole + "-button multiple-family-buttons' id='mfamilyview_" + familyName + "-" + individualRole + "'> " + individualRole + " </div>");
                    
                    $('.FileDirectoryContent').find('#dashboardTableBody').append("<tr id='fileview_" + familyName + "-" + individualRole + "' class='fileview-table-rows'></tr>");
                    $("#fileview_" + familyName + "-" + individualRole).append("<td><div class='fileview-checkmark'></div><td>" + individualRole + "</td> <td>" + familyName + "</td><td>" + individualRole + "</td> <td> " + infected + "</td>");
                    
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
        url: "http://gbwtquery.westus.cloudapp.azure.com/Iwana/variant",
        dataType: 'json',
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
        $("#fileview_" + commonId).find(".fileview-checkmark").css("background-image", "url('img/checkmark.png')");

        

        displayData(family, member).success(function(d) {
            var biographHeader = "<div class='biograph-headers'>" + member + " - Family-" + family + "</div>"

            $("#data-vis-body_2").append("<div id='" + family + member + "' class='biograph-data family-" + family + "-biograph-data'>" + biographHeader + "<pre class='biograph_Content'>" + d.variant + "</pre></div>");
            
            //adjust width of 'data-vis-body_2' to hold all data horizontally
            var setWidth = $(".biograph-data").length * 35;
            $("#data-vis-body_2").width(setWidth + "vw");

            var biographContentDivs = $(".biograph_Content")
            // NOT THE BEST WAY TO DO THIS...but it works ¯\_(ツ)_/¯
            for (var i = 0; i < biographContentDivs.length; i++) {
                biographContentDivs[i].addEventListener('scroll', biographDataScroll, false);
            }
        });
    }
    else {
        $("#mfamilyview_" + commonId).removeClass("clicked");
        $("#fileview_" + commonId).removeClass("clicked");
        $("#fileview_" + commonId).find(".fileview-checkmark").css("background-image", "none");

        $("#" + family + member).remove();
    } 
    
    // If the Bio Graph Visualization div is not currently displaying then display it
    if($("#bottomSection").find(".BioGraphViz").css("display") == "none"){
        $(".data-vis-initial-msg").hide();
        $("#bottomSection").find(".BioGraphViz").show();
        $("#bottomSection").find(".BarGraphViz").hide();
        $("#bio-graph-viz").css('background-color', '#879e4e'); //darken 
        $("#bar-graph-viz").css('background-color', '#A9C662'); //reset 
        
        $(".data-vis-index-chrom").val(5);
        $(".data-vis-index-start").val(12811015);
        $(".data-vis-index-end").val(12820538);
    }
    
    //if no data is being displayed (no individuals are clicked on), display initial message
    if($(".clicked").length == 0) {
        $(".data-vis-initial-msg").show();
        $("#bottomSection").find(".BioGraphViz").hide();
        $("#bottomSection").find(".BarGraphViz").hide();
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
        $(".family-view-initial-msg").hide();
    } else {
        $(".family-view-initial-msg").show();
    }
    
}

// Handles synchronized scrolling across all biograph_Content divs
function biographDataScroll() {
    if(synchronizedScrolling){
        $(".biograph_Content").scrollTop($(this).scrollTop());    
    }   
}


