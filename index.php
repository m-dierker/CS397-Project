
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>UIUC Online Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Online dashboard">
    <meta name="author" content="Matthew Dierker, Brian Doherty">

    <!-- Le styles -->
    <link href="/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <style>
      body {
        padding-top: 60px; /* 60px to make the container go all the way to the bottom of the topbar */
      }
    </style>
    <link href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" rel="stylesheet">
    <link href="/lib/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
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

        window.fbInitialized = true;

        // Additional initialization code such as adding Event Listeners goes here
        if(window.site) {
          window.site.setupFacebook();
        }
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

      <div id="facebook-loader" class="valign-middle-wrap">
        <div class="valign-middle">
          <img src="/img/loader.gif">
        </div>
      </div>

      <div id="facebook-login" class="valign-middle-wrap hide">
        <div class="valign-middle">
          <p>
            <fb:login-button size="large">Login with Facebook</fb:login-button>
          </p>
        </div>
      </div>




      <div id="controls" class="hide">
        <div class="well">
          <a class="btn btn-small" href="#" id="add-widget-button"><i class="icon-plus"></i> Add a Widget</a>
        </div>
      </div>



      <!-- End Content -->
    </div>

    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="//code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
    <script src="/lib/bootstrap/js/bootstrap.min.js"></script>
    <script src="/js/Site.js"></script>
    <script src="/js/Widget.js"></script>
    <script src="/js/GlobalFunctions.js"></script>

  </body>
</html>
