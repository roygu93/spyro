var synchronizedScrolling = true; //TODO: need to connect this to a button
var startCoordinate, endCoordinate;
var countToUpdate = 0;

$(document).ready(function(){
    var mouseDownOccurred = false;
    var multipleFamilyCardsBackgroundColor = ["rgba(185,136,151,.90)", "rgba(126,168,107,.90)","rgba(107,156,168,.90)"] 
    var bottomSectionHeightBeforeCollapse= 0;
    var height = $(window).width();
    $("#family-view-icon").addClass("view-selected top-view-selected"); //darken - because already on the family view
    //$("#family-view-icon").css('background-color', '#4b9188'); //darken - because already on the family view
    $(".banner").height(height *.14);
    
    appendExistingSessions();
    
    $(window).resize(function() {
        height = $(window).width();
        $(".banner").height(height * 0.14);
    });

    /********** Top Section Sidebar **********/
    $("#family-view-icon").on("click", function() {
        if ($(".FamilyViewContent").is(':visible') == false) {
            $(".FamilyViewContent").show();
            $(".FileDirectoryContent").hide();
            
            $("#family-view-icon").addClass("view-selected top-view-selected"); //darken
            //$("#family-view-icon").css('background-color', '#4b9188'); //darken
            
            $("#file-view-icon").removeClass("view-selected top-view-selected"); //reset
            //$("#file-view-icon").css('background-color', '#98CBC3'); //reset
        // } else {
        //     $(".FamilyViewContent").hide();
            
        //     $("#family-view-icon").removeClass("view-selected top-view-selected"); //reset
        //     //$("#family-view-icon").css('background-color', '#98CBC3'); //reset
        }
    });

    $("#file-view-icon").on("click", function() {
        if ($(".FileDirectoryContent").is(':visible') == false) {
            
            $(".FileDirectoryContent").show();
            $(".FamilyViewContent").hide();
            
            $("#family-view-icon").removeClass("view-selected top-view-selected"); //reset
            //$("#family-view-icon").css('background-color', '#98CBC3'); //reset
            
            $("#file-view-icon").addClass("view-selected top-view-selected"); //darken
            //$("#file-view-icon").css('background-color', '#4b9188'); //darken
        // } else {
        //     $(".FileDirectoryContent").hide();
            
        //     $("#file-view-icon").removeClass("view-selected top-view-selected"); //reset
        //     //$("#file-view-icon").css('background-color', '#98CBC3'); //reset

        }
    });

    /********** Bottom Section Sidebar **********/
    $("#bio-graph-viz").on("click", function() {
        if(document.getElementsByClassName("biograph-data").length >0){
            $(".data-vis-initial-msg").hide();
            
            if ($(".BioGraphViz").is(':visible') == false) {
                $(".BioGraphViz").show();
                $(".BarGraphViz").hide();
                
                $("#bio-graph-viz").addClass("view-selected bottom-view-selected"); //darken
                //$("#bio-graph-viz").css('background-color', '#879e4e'); //darken 
                
                $("#bar-graph-viz").removeClass("view-selected bottom-view-selected"); //reset
                //$("#bar-graph-viz").css('background-color', '#A9C662'); //reset
            } else {
                $(".BioGraphViz").hide();
                
                $("#bio-graph-viz").removeClass("view-selected bottom-view-selected"); //reset
                //$("#bio-graph-viz").css('background-color', '#A9C662'); //reset
            }
        }
    });
     
    $("#bar-graph-viz").on("click", function() {
        if(document.getElementsByClassName("biograph-data").length >0){
            $(".data-vis-initial-msg").hide();
            
            if ($(".BarGraphViz").is(':visible') == false) {
                $(".BarGraphViz").show();
                $(".BioGraphViz").hide();
                
                $("#bar-graph-viz").addClass("view-selected bottom-view-selected"); //darken
                //$("#bar-graph-viz").css('background-color', '#879e4e'); //darken
                
                $("#bio-graph-viz").removeClass("view-selected bottom-view-selected"); //reset
               // $("#bio-graph-viz").css('background-color', '#A9C662'); //reset
            } else {
                $(".BarGraphViz").hide();
                
                $("#bar-graph-viz").removeClass("view-selected bottom-view-selected"); //reset
                //$("#bar-graph-viz").css('background-color', '#A9C662'); //reset
            }
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
                
                if (bottomsTop < window.innerHeight - 105) {
                    $dragable.css({
                        height: newHeight,
                        top: bottomsTop
                    });

                    $('.sidebarBottom').css({
                        height: newHeight
                    });

                    $('#bottomSection').find('.content').css({
                        height: (newHeight - 22)
                    });

                    $('#topSection').find('.content').css({
                        height:newTopSectionHeight
                    });

                    $(".sidebarTop").css({
                        height:newTopSectionHeight
                    });

                    // $(".biograph-data").css({
                        // height: "calc(97% - 25px)"
                    // });        
                }
                
            }
            
        });         
    });

    $(".collapseButton").on('click', function (me) {
        if($("#topSection").hasClass("collapse in")){
            //meaning the top section is about to be displayed - replace with 100% height
            var fillWindow = window.innerHeight - parseInt($('#divider').css("border-top-width")) - 85

            //saving the old value
            bottomSectionHeightBeforeCollapse = parseInt($('#bottomSection').find('.content').css("height")) + 20

            $('#bottomSection').find('.content').css({
                height: fillWindow
            });

            $('.sidebarBottom').css({
                height: fillWindow
            });

            document.getElementById("collapse_expandButtonImage").src = "./img/downarrow.png";
            $('.hr').css({
                cursor: "auto"
            });

        } else {

            $('#bottomSection').find('.content').css({
                height: bottomSectionHeightBeforeCollapse
            });

            $('.sidebarBottom').css({
                height: bottomSectionHeightBeforeCollapse
            });
            
            document.getElementById("collapse_expandButtonImage").src = "./img/uparrow.png";
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
        
        //$("#family-x-checkbox").prop("checked", true);
        
        /********** Multiple Family Tree Button OnClick Event Handler **********/
        $(".multiple-family-buttons").on("click", toggleActiveButtons);
        
        /********** File View Button OnClick Event Handler **********/
        $(".fileview-table-rows").on("click", toggleActiveButtons);
        
        $("#dashboardTable").tablesorter();
        
        //Save session 
        $("#save-session").on("click", function() {
            if(document.getElementsByClassName("biograph-data").length >0){
                saveSession();    
            }
            
        });
        
        //Retrieve saved session
        $("#saved-sessions-dropdown").find(".saved-session-retrieve").on("click", function() {
            retrieveSession(event.target.innerHTML.trim()); 
        });
    });
    
    

    /********** Updating the Biograph Data Based on New Coordinates **********/
    $("#coordinateSubmitButton").on('click', function(x) {
        var retrievedStart = $(".data-vis-index-start").eq(1).val();
        var retrievedEnd = $(".data-vis-index-end").eq(1).val();
        if(retrievedEnd < retrievedStart || retrievedEnd - retrievedStart >= 20000 ){
            //reset the values in the input <-- thoughts??
            $(".data-vis-index-start").val(startCoordinate);
            $(".data-vis-index-end").val(endCoordinate);
            alert("Invalid set of coordinates. Coordinate difference needs to be < 20,000. Please try again.")

        } else if(retrievedStart != startCoordinate || retrievedEnd != endCoordinate) {
            
            //1. retrieve which family member's viz are showing
            var dataDivsCurrentlyDisplay = $(".biograph-data")
            countToUpdate = dataDivsCurrentlyDisplay.length

            for(i = 0; i < dataDivsCurrentlyDisplay.length; i++){
                //2. request displayData for each of the family members
                //TODO: Optional - display loading gif until data is updated? 
                var title = dataDivsCurrentlyDisplay[i].getElementsByClassName("biograph-headers")[0].innerHTML
                var splitTitle = title.split("-")
                var family = splitTitle[1].trim().toLowerCase() + "-" + splitTitle[2].trim()
                var role = splitTitle[0].trim()

                displayData(family, role)
            }
        }
    });


    /********** Download Button Clicked **********/
    $('#downloadButton').on('click', function(x){

        var dataDivs = document.getElementsByClassName('biograph_Content');
        for(i=0 ; i< dataDivs.length ; i++) {
            dataDivs[i].style.height = "initial";
        }

        $("#data-vis-body_2").height((dataDivs[0].offsetHeight + 60) + "px");
        document.getElementById('data-vis-body_2').parentNode.style.overflow = 'visible'; 
        

        html2canvas($("#data-vis-body_2"), {
            onrendered: function(canvas) {
                var a = document.createElement('a');
                // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                a.download = 'Spyro_BioGraphComparison.jpg'; //TODO: probably should have a count? 
                a.click(); // downloads the image

                /********** Reset the tool to how it originally was **********/
                document.getElementById('data-vis-body_2').parentNode.removeAttribute("style");
                document.getElementById('data-vis-body_2').removeAttribute("style");

                // Reset the width of the div to what it was originally
                var setWidth = $(".biograph-data").length * 400;
                $("#data-vis-body_2").width(setWidth + "px");

                // Reset the heigh of the biograph data divs to what they were originally
                var dataDivs = document.getElementsByClassName('biograph_Content');
                for(i=0 ; i< dataDivs.length ; i++) {
                    dataDivs[i].removeAttribute("style")
                }
                
            }
        })
    });

});

function displayData(family, member) {
    startCoordinate = $(".data-vis-index-start").eq(1).val();
    endCoordinate = $(".data-vis-index-end").eq(1).val();
    var modifiedURL = "http://gbwtquery.westus.cloudapp.azure.com/Iwana/variant/json/g" + member + "/" + startCoordinate + "/" + endCoordinate;
    // alert(modifiedURL)
    return $.ajax({
        url: modifiedURL,
        method: "GET",
        success: function(d) {
            if (countToUpdate > 0) {
                var familyID = family.split("-")[1]
                var id = "#"+ familyID + member   
                console.log(id)
                console.log($(id))
                var contentDiv = $(id)[0].getElementsByClassName("biograph_Content")[0]
                var dataString ="";
                for(j = 0; j < d.length; j++) {
                    dataString += d[j].substr(7,d[j].length) + "<br/>"
                }

                contentDiv.innerHTML = dataString
                countToUpdate--
            }
            
        }
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

 // If the Bio Graph Visualization div is not currently displaying then display it
    // If the Bio Graph Visualization div is not currently displaying then display it
    if($("#bottomSection").find(".BioGraphViz").css("display") == "none"){
        $(".data-vis-initial-msg").hide();
        $("#bottomSection").find(".BioGraphViz").show();
        $("#bottomSection").find(".BarGraphViz").hide();
        
        $("#bio-graph-viz").addClass("view-selected bottom-view-selected");
        //$("#bio-graph-viz").css('background-color', '#879e4e'); //darken 
        
        $("#bar-graph-viz").removeClass("view-selected bottom-view-selected");
        //$("#bar-graph-viz").css('background-color', '#A9C662'); //reset 
        
    }

    $(".data-vis-index-chrom").val(5);
    $(".data-vis-index-start").val(12811015);
    $(".data-vis-index-end").val(12820538);
    

    if(!$("#mfamilyview_" + commonId).hasClass("clicked") && !$("#fileview_" + commonId).hasClass("clicked")) {
        $('#mfamilyview_' + commonId).addClass("clicked");
        $("#fileview_" + commonId).addClass("clicked");
        $("#fileview_" + commonId).find(".fileview-checkmark").css("background-image", "url('img/checkmark.png')");

        

        displayData(family, member).success(function(d) {
            var dataString ="";
            for(i = 0; i < d.length; i++) {
                dataString += d[i].substr(7,d[i].length) + "<br/>"
            }

            var biographHeader = "<div class='biograph-headers'>" + member + " - Family-" + family + "</div>"

            $("#data-vis-body_2").append("<div id='" + family + member + "' class='biograph-data family-" + family + "-biograph-data'>" + biographHeader + "<pre class='biograph_Content'>" + dataString + "</pre></div>");
            
            //adjust width of 'data-vis-body_2' to hold all data horizontally
            var setWidth = $(".biograph-data").length * 400;
            $("#data-vis-body_2").width(setWidth + "px");

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
    
    //if no data is being displayed (no individuals are clicked on), display initial message
    if($(".clicked").length == 0) {
        $(".data-vis-initial-msg").show();
        $("#bottomSection").find(".BioGraphViz").hide();
        $("#bottomSection").find(".BarGraphViz").hide();
        
        $("#bio-graph-viz").removeClass("view-selected bottom-view-selected");
        //$("#bio-graph-viz").css('background-color', '#A9C662'); //reset 
        
        $("#bar-graph-viz").removeClass("view-selected bottom-view-selected");
        //$("#bar-graph-viz").css('background-color', '#A9C662'); //reset 
    } 

}

function addToSelectFamilyDropDown(familyName) {
    var htmlString = "<li><label class='select-family-labels' onClick='displayFamilyCard(this)'><input type='checkbox' id='" + familyName + "-checkbox' class='select-family-checkboxes'/>" + familyName + "</label></li>";
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

//Append existing saved sessions to the dropdown menu
function appendExistingSessions() {
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        if(ca[i]) {
            var name = ca[i].split("=")[0];
            $("#saved-sessions-dropdown").append("<li class='saved-sessions-li'><a class='saved-session-retrieve'>" + name + "</a><a class='glyphicon glyphicon-remove saved-session-remove' onclick='deleteSession(this)'></a></li>");
        }
    }
}

//Create a new saved session
function saveSession() {
    var membersSelected = $("body").find('.clicked');
    var membersOutput = saveSessionHelper(membersSelected);
    
    var familiesSelected = $(".familyDropdown").find('input:checked');
    var familiesOutput = saveSessionHelper(familiesSelected);
    
    var viewsSelected = $(".nav-stacked").find('.view-selected');
    var viewsOutput = saveSessionHelper(viewsSelected);
    
    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    $("#saved-sessions-dropdown").append("<li class='saved-sessions-li'><a class='saved-session-retrieve' onClick='retrieveSession(this.innerHTML.trim())'>" +  d.toUTCString() + "</a><a class='glyphicon glyphicon-remove saved-session-remove' onclick='deleteSession(this)'></a></li>");
    
    var mainOutput = membersOutput + "..." + familiesOutput + "..." + viewsOutput;
    
    document.cookie = d.toUTCString() + "=" + mainOutput + "; " + expires;
        
    alert("Session Saved under the name: \n" + d.toUTCString());
}

function deleteSession(htmlElement) {
    var sessionName = htmlElement.parentNode.children[0].innerHTML.trim();
    
    if(confirm("Are you sure you want to delete Cookie: " + sessionName + "?")) {
        var remove = htmlElement.parentNode;
        var cookieValue = "";
                
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') {
                c = c.substring(1);
            }
            if (c.indexOf(sessionName) == 0) {
                cookieValue = c.substring(sessionName.length,c.length);
            }
        }
        
        document.cookie = sessionName + "=" + cookieValue + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        remove.remove();
    }
}

//Retrieve a selected saved session
function retrieveSession(cname) {
    resetElements();  //reset all elements
    
    var output = "";
    var categories = [];
    var name = cname + "=";
    var ca = document.cookie.split(';');
    
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            categories = c.substring(name.length,c.length).split("...");
        }
    }
    
    var viewsSelected = categories[2].split(",");
    
    //display selected views
    if(viewsSelected.length > 0) {
        //if a top view was selected
        if(viewsSelected[0]) {
            var topView = viewsSelected[0].replace("-view-icon", "");
            
            if(topView == "family") {
                //display family view
                $(".FamilyViewContent").css("display" , "block");
                $("#family-view-icon").addClass("view-selected top-view-selected");
            } else {
                //dispaly file directory
                $(".FileDirectoryContent").css("display" , "block");
            }
        }
        
        //if a bottom view was selected
        if(viewsSelected[1]) {
            var bottomView = viewsSelected[1].replace("-graph-viz", "");
            
            if(bottomView == "bio") {
                //display biograph data
                $(".BioGraphViz").css("display" , "block");
                $("#bio-graph-viz").addClass("view-selected bottom-view-selected");
            } else {
                $(".BarGraphViz").css("display" , "block");
            }
        }
    }
    
    var familyCards = categories[1].split(",");
    
    //display selected family cards
    if(familyCards[0]) {
        for(var i = 0; i < familyCards.length; i++) {
            var checkbox = "#" + familyCards[i];
            var familyName = "#" + familyCards[i].replace("-checkbox", "");
            
            $(familyName).css("display", "inline-block");
            $(".family-view-initial-msg").hide();
            
            $(checkbox).prop("checked", true);
        }
    } else {
        //top section initial message
        $(".FamilyViewContent").css("display" , "block");
        $(".family-view-initial-msg").css("display" , "block");
    }
    
    var membersSelected = categories[0].split(",");
    
    //click selected members and display their data
    if(membersSelected[0]) {
        for(var i = 0; i < membersSelected.length; i++) {
            var memberId = "#" + membersSelected[i];
            
            if(i < (membersSelected.length / 2)) {
                $(memberId).trigger("click");
                $(".data-vis-initial-msg").hide();
            }
            
        }
    }
}

//helper function for save session function
function saveSessionHelper(selected) {
    var output = "";
    
    for(var i = 0; i < selected.length; i++) {
        if(i < selected.length - 1) {
            output += selected[i].id + ",";
        } else {
            output += selected[i].id;
        }
    }
    
    return output;
}

//resets, hides, unchecks, unclicks all elements in the dashboard
function resetElements() {
    //family view elements
    $(".FamilyViewContent").css("display" , "none");
    $("#family-view-icon").removeClass("view-selected top-view-selected");
    
    $(".multiple-family-cards").css("display" , "none");
    $(".select-family-checkboxes").prop("checked", false);
    $(".multiple-family-buttons").removeClass("clicked");
    
    //file view elements
    $(".FileDirectoryContent").css("display" , "none");
    $("#file-view-icon").removeClass("view-selected top-view-selected");
    
    $(".fileview-table-rows").removeClass("clicked");
    $(".fileview-checkmark").css("background-image" , "none");
    
    //top section initial message
    $(".family-view-initial-msg").css("display" , "block");
    
    //bio graph data
    $(".BioGraphViz").css("display" , "none");
    $("#bio-graph-viz").removeClass("view-selected bottom-view-selected");
    $("#data-vis-body_2").html("");
    
    //bar graph data
    $(".BarGraphViz").css("display" , "none");
    $("#bar-graph-viz").removeClass("view-selected bottom-view-selected");
    
    //bottom section initial message
    $(".data-vis-initial-msg").css("display" , "block");
}
