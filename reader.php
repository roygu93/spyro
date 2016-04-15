<?php
	$folder = $_GET['folder']; 

	if ($handle = opendir($folder)) {
	    while (false !== ($entry = readdir($handle))) {
	        if ($entry != "." && $entry != "..") {
	        	echo $entry . " <br/>";

	        	$member = opendir($folder . "/" . $entry);
	        	while (false !== ($entry2 = readdir($member))) {
		            if ($entry2 != "." && $entry2 != "..") {
		            	echo $entry2;
		            }
		        }

		        echo "||";
	        }
	    }
	    closedir($handle);
	}
?>