<?php
/**
 * Main index
 *
 * @author Suriyaa Kudo, 2015-present
 * @license http://suriyaakudo.mit-license.org/
 * @package wm-search
 */

/**
 * Configuration
 * -------------------------------------------------
 */


/**
 * Output
 * -------------------------------------------------
 */

<?include("inc/functions.php");?>
<html>
 <head>
  <?head("", array("index"));?>
 </head>
 <body>
  <?headerElem();?>
  <div class="container">
   <center>
    <h1>Web Search</h1>
    <form class="searchForm" action="search.php" method="GET">
     <input type="text" autocomplete="off" name="q" id="query"/>
     <div>
      <button>
       <svg class='shape-search' viewBox="0 0 100 100" class='shape-search'><use xlink:href='#shape-search'></use></svg>
      </button>
     </div>
     <p>Free, Open Source & Anonymous</p>
     <p><a href="https://github.com/subins2000/search">GitHub (Source Code)</a></p>
     <p><a href="about">About</a></p>
    </form>
   </center>
  </div>
  <?footer();?>
 </body>
</html>
