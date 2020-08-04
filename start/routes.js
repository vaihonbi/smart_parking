"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Đường dẫn: /auth/*
Route.group(() => {
  Route.get("/login", "LoginController.showLogin").as("login");
  Route.post("/login", "LoginController.login");
})
  .prefix("/auth")
  .as("auth")
  .namespace("Auth")
  .middleware("guest");

// Đường dẫn: /admin/*
Route.group(() => {
  Route.get("/", "HomeController.index").as("home");
})
  .prefix("/admin")
  .as("admin")
  .namespace("Admin")
  .middleware(["auth", "is:admin"]);

// Đường dẫn: /parking/*
Route.group(() => {
  Route.get("/", "HomeController.index").as("home");
  Route.delete("/", "HomeController.logout").as("logout");
})
  .prefix("/parking")
  .as("parking")
  .namespace("Parking")
  .middleware(["auth", "is:owner", "parking"]);
