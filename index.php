<?php

/** Load Controllers / ToDo: faire plus clean */
require_once('controllers/ErrorController.php');
require_once('controllers/IndexController.php');

require_once('models/Database.php');
require_once('models/Example.php');

/** Load config files */
require_once('config/constants.php');
require_once('config/credentials.php');

/** Load routes and routes Handler -> start the page */
require_once('app/viewsHandler.php');
require_once('app/routesHandler.php');