<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Spyro</title>

    <!-- Bootstrap core CSS -->
    <link href="vendors/bootstrap-3.3.6-dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="vendors/bootstrap-3.3.6-dist/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
   <!--  <link href="navbar-static-top.css" rel="stylesheet"> -->

    <!-- Custom styles for this template -->
    <link href="vendors/bootstrap-3.3.6-dist/css/sticky-footer-navbar.css" rel="stylesheet">

    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="vendors/bootstrap-3.3.6-dist/js/ie-emulation-modes-warning.js"></script>
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="stylesheet" href="css/spyro.css"/>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>


    <script type="text/javascript" src="js/index.js"></script>

    <script type="text/javascript">
      window.onload = function() {
        var folder = "dummy";
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "reader.php?folder=" + folder, true);
        xmlhttp.send();   

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var folderNames = xmlhttp.responseText.split("||");

                for(var i = 0; i < folderNames.length - 1; i++) {
                  var familyName = folderNames[i].split("<br/>")[0];
                  var members = folderNames[i].split("<br/>")[1].split(".txt");

                  var family = document.createElement("div");
                  family.className = "multiple-family-cards";

                  var header = document.createElement("h3");
                  header.innerHTML = familyName;

                  family.appendChild(header); 

                  //<div class="multiple-family-buttons" id="Family_X||Mother" onclick="displayData()">
                  for(var j = 0; j < members.length - 1; j++) {
                    var body = document.createElement("div");
                    body.className = "multiple-family-buttons";
                    body.id = members[j];
                    body.onclick = displayData;
                    body.innerHTML = members[j];
                    family.appendChild(body);
                  }

                  document.getElementById("family-view-body").insertBefore(family, document.getElementById("family-view-body").firstChild);
                }

                document.getElementById('searchResults').innerHTML = results;
            }
        }
      }

      function displayData() {
        var buttons = document.getElementsByClassName("multiple-family-buttons");
        var selected = [];

        if(event.target.className.indexOf("active") > -1) {
          var index = event.target.className.indexOf(" active");
          event.target.className = event.target.className.substr(0, index);
        } else {
          event.target.className += " active";
        }

        for(var i = 0; i < buttons.length; i++) {
            if(buttons[i].className.indexOf("active") > -1) {
                selected.push(buttons[i].id);
            }
        }

        document.getElementById("data-vis-body").innerHTML = selected;
        
      }
    </script>
  </head>

  <body>

    <!-- Fixed navbar -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">
              <img src="img/spyro.png" alt="Logo" height="30" class="navbar-logo"/>
          </a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">

            <li class="nav-icons">
              <a href="#about" class="icon_links">
                <img src="img/refresh.png" id="refresh_icon" alt="refresh_icon"/>
              </a>
            </li>

            <li class="nav-icons">
              <a href="#about" class="icon_links">
                <img src="img/download.png" id="download_icon" alt="download_icon"/>
              </a>
            </li>

            <li class="nav-icons">
              <a href="#about" class="icon_links">
                <img src="img/save.png" id="save_icon" alt="save_icon"/>
              </a>
            </li>

            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Saved Sessions <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <!--
    TODO:
     - Need to fix sidebar "class=active" and change background color
     - [FIXED] resizing the window doesn't resize the content div
     - Roy's chrome doesn't render the tool correctly
   -->
    <div id="topSection">
      <div class="navbar-default sidebar sidebarTop" role="navigation">
          <ul class="nav nav-stacked ">
            <li>
                <a href="dashboard.html" id="selected-top"> <img src="./img/FamilyView.png" class="sidebar-icons"/></a>
            </li>
            <li>
                <a href="dashboard.html"> <img src="./img/FileDirectory.png" class="sidebar-icons"/></a>
            </li>
          </ul>
      </div>
    

      <div class="content">
        <div class="FamilyViewContent">
          <div class="section-header">
            <h1>Family View</h1>
          </div>
        </div>
         <div class="section-body" id="family-view-body" style="width: 100%; height: 100%; text-align: center;">
            <!-- <div class="multiple-family-cards">
                <h3>Family X</h3>
                
                <div class="multiple-family-buttons" id="Family_X||Mother" onclick="displayData()">
                  Mother
                </div>
                <div class="multiple-family-buttons" id="Family_X||Father" onclick="displayData()">
                  Father
                </div>
                <div class="multiple-family-buttons" id="Family_X||Child" onclick="displayData()">
                  Child
                </div>
            </div>
            <div class="multiple-family-cards">
                <h3>Family Y</h3>
                <div class="multiple-family-buttons" id="Family_Y||Mother" onclick="displayData()">
                  Mother
                </div>
                <div class="multiple-family-buttons" id="Family_Y||Father" onclick="displayData()">
                  Father
                </div>
                <div class="multiple-family-buttons" id="Family_Y||Child" onclick="displayData()">
                  Child
                </div>
            </div>
            <div class="multiple-family-cards">
                <h3>Family Z</h3>
                <div class="multiple-family-buttons" id="Family_Z||Mother" onclick="displayData()">
                  Mother
                </div>
                <div class="multiple-family-buttons" id="Family_Z||Father" onclick="displayData()">
                  Father
                </div>
                <div class="multiple-family-buttons" id="Family_Z||Child" onclick="displayData()">
                  Child
                </div>
            </div> -->

            <div class="family-tree-button-wrap">
              <li class="dropdown">
                <a href="#" class="family-tree-button" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Select a Family</a>
                <ul class="dropdown-menu">
                  <li><label class="select-family-labels"><input type="checkbox" class="select-family-checkboxes"/>Family X</label></li>
                  <li><label class="select-family-labels"><input type="checkbox" class="select-family-checkboxes"/>Family Y</label></li>
                  <li><label class="select-family-labels"><input type="checkbox" class="select-family-checkboxes"/>Family Z</label></li>
                </ul>
              </li>
            </div>
          </div>

        <div class="FileDirectoryContent">
          <div class="section-header">
          <h1>File Directory</h1>
          </div>
        </div>
        
      </div>
    </div>


    <!-- 
    TODO: 
     - if you reduce the height of the window sad things happen :( and z-index doesn't fix it 
    -->
    

    <!-- BOTTOM PART -->
    <div id="bottomSection">
      <div class="hr">
        <hr id="divider">
        <img src='./img/DividerGrips.png' alt=''>
      </div>
      <div class="navbar-default sidebar sidebarBottom" role="navigation">
          <ul class="nav nav-stacked ">
            <li>
                <a href="dashboard.html" id="selected-bottom"> <img src="./img/BarGraph.png" class="sidebar-icons"/></a>
            </li>
            <li>
                <a href="dashboard.html"> <img src="./img/BioGraph.png" class="sidebar-icons"/></a>
            </li>
          </ul>
      </div>
    

      <div class="content">
        <div class="FamilyViewContent">
          <div class="section-header">
            <h1>Data Visualization</h1>
            <div id="data-vis-body">

            </div>
          </div>
        </div>
        
      </div>
    </div>




    <footer class="footer">
      <div class="container">
        <p class="text-muted">Sprial Genetics  •  iSchool  •  Capstone 2016</p>
      </div>
    </footer>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="vendors/bootstrap-3.3.6-dist//js/vendor/jquery.min.js"><\/script>')</script>
    <script src="vendors/bootstrap-3.3.6-dist//js/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="vendors/bootstrap-3.3.6-dist//js/ie10-viewport-bug-workaround.js"></script>
  </body>
</html>
