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

// Đường dẫn: /*
Route.group(() => {
  Route.on("/").render("landing.pages.home").as("home");
  Route.on("/nhom.html").render("landing.pages.home").as("team");
  Route.on("/lien-he.html").render("landing.pages.home").as("contact");
  Route.on("/bang-gia.html").render("landing.pages.home").as("price");
})
  .as("landing")
  .namespace("Landing");

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
  .middleware(["auth", "is:admin", "online"]);

// Đường dẫn: /parking/*
Route.group(() => {
  Route.get("/", "HomeController.index").as("home");
  Route.delete("/", "HomeController.logout").as("logout");

  Route.get("/profile", "ProfileController.edit").as("profile");
  Route.put("/profile", "ProfileController.update").as("profile.update");

  Route.get("/cameras", "CameraController.index").as("cameras");
  Route.get("/cards", "CardController.index").as("cards");
  Route.get("/cards/_lost", "CardController.lost").as("cards.lost");

  Route.get("/sessions", "SessionController.index").as("sessions");
  Route.get("/sessions/_holding", "SessionController.holding").as(
    "sessions.holding"
  );
  Route.get("/sessions/_lost", "SessionController.lost").as("sessions.lost");

  Route.resource("users", "UserController");

  Route.get("/transactions", "TransactionController.index").as("transactions");
  Route.get("/transactions/:id", "TransactionController.show").as(
    "transactions.show"
  );

  Route.get("/settings", "SettingController.index").as("settings");
})
  .prefix("/parking")
  .as("parking")
  .namespace("Parking")
  .middleware(["auth", "is:owner", "parking", "online"]);
