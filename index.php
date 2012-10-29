
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>UIUC Online Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Online dashboard">
    <meta name="author" content="Matthew Dierker, Brian Doherty">

    <!-- Le styles -->
    <link href="/css/bootstrap/bootstrap.min.css" rel="stylesheet">
    <style>
      body {
        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
    </style>
    <link href="/css/bootstrap/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="/css/site.css" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <body>

    <!-- Start Facebook Code -->
    <div id="fb-root"></div>
    <script>
      window.fbAsyncInit = function() {
        // init the FB JS SDK
        FB.init({
          appId      : '260235980765125', // App ID from the App Dashboard
          channelUrl : '//my.eatcumtd.com/channel.php', // Channel File for x-domain communication
          status     : true, // check the login status upon init?
          cookie     : true, // set sessions cookies to allow your server to access the session?
          xfbml      : true  // parse XFBML tags on this page?
        });

        // Additional initialization code such as adding Event Listeners goes here

      };

      // Load the SDK's source Asynchronously
      (function(d){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/en_US/all.js";
         ref.parentNode.insertBefore(js, ref);
       }(document));
    </script>
    <!-- End Facebook Code -->

    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#">CS 397</a>
          <div class="nav-collapse collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="container" id="main-container">
      <!-- Begin Content -->

      <div class="valign-middle-wrap">
        <div id="facebook-login" class="valign-middle">
          <p>
            <img src="http://placehold.it/300x40">
          </p>
        </div>
      </div>



      <!-- End Content -->
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="/js/bootstrap/bootstrap.min/js"></script>

  </body>
</html>
