<?php

use Controllers\RouteError;

require_once('routes.php');

$potentialId = -1;
$currentRoute = 0;

for ($i = 0; $i < count($router); $i++) {
    $routeName = $router[$i][0];
    $routeParameters = $router[$i][1];

    /* Vérification id ? */
    if (str_contains($routeName, '{id}')) {
        $explodedString = explode('/', $_SERVER['REQUEST_URI']);
        $potentialId = end($explodedString);

        if (is_numeric($potentialId)) {
            array_pop($explodedString);
            array_push($explodedString, '{id}');
            $_SERVER['REQUEST_URI'] = implode('/', $explodedString);
        }
    }

    /* Vérification de la route et de la méthode */
    if ($routeName == $_SERVER['REQUEST_URI']) {
        $requestedMethod = $routeParameters['method'];

        if ($_SERVER['REQUEST_METHOD'] == strtoupper($requestedMethod)) {
            $currentRoute = $router[$i];
            break;
        }
    }
}

if ($currentRoute) {
    $controller = '\\Controllers\\' . $currentRoute[1]['controller'];
    $actionString = $currentRoute[1]['action'];

    //ToDo: Handle broken links
    if (class_exists($controller)) {
        $controller = new $controller;

        if (is_callable([$controller, $actionString])) {
            if ($potentialId === -1) {
                call_user_func_array([$controller, $actionString], []);
            } else {
                call_user_func_array([$controller, $actionString], ['id' => $potentialId]);
            }
        } else {
            // ToDo erreur
        }
    }
    else
    {
        // ToDo erreur
    }
} else {
    call_user_func_array([RouteError::class, "error404"], []);
}
