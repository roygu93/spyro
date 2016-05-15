<img src="./img/SpyroOfficialLogo.png" height="100px"/>

INFO 491 Capstone 2016

##Problem Statement
How do we create a genetic data visualization platform for genetic researchers to better understand, utilize and interpret their data on familial genetics.

##Set Up
1. Clone this repo
2. Run `python -m SimpleHTTPServer 8080` in Terminal
3. Navigate to Spyro's Index or Dashboard pages

##TODO List
* Header + Footer `[SEMI-DONE - need to clean up]`
* Index/Intro Page `[TODO - in progress]`
  * About Page `[TODO - in progress]`
* Top View
  * Side bar to switch between views `[DONE]`
  * Single Family View `[de-prioritizing]`
  * Multiple Family View `[DONE]`
  * File Directory `[DONE]`
* Bottom View
  * BioGraph Visualization `[1/2 DONE - need to get specifying the coordinate/location to work]`
  * Bar Graph Visualization `[de-prioritizing based on time constraint]`
  * Side-by-side comparison of visualizations `[DONE]`

##Backend API Notes
The infrastructure of our application is a 38GB memory server hosted on Microsoft Azure. The server is owned by our sponsor, SpiralGenetics. SpiralGenetics has patented a custom data structure that allows them to compress a large amount of genetic data and load them into memory. In addition, they have implemented a low level API that is able to interrogate the in memory dataset, and a Python application that allows them to visualize genetic variance in the CLI.

Spyro is a front end application that consumes the genetic variance data available through the low level API. However, SpiralGenetics does not have a REST API for developers to query and effectively leverage their data. Our goal is to help implement a REST API that allows them to expose their dataset through a web endpoint and returns the dataset in JSON structure that will be consumable to developers. We plan on using the data to construct a genetic variance bar chart that will make it more effective for researchers to identify coordinates of mutation.
