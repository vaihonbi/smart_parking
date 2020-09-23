"use strict";

/** @type {import('path')} */
const path = use("path");

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  "@adonisjs/framework/providers/AppProvider",
  "@adonisjs/framework/providers/ViewProvider",
  "@adonisjs/lucid/providers/LucidProvider",
  "@adonisjs/bodyparser/providers/BodyParserProvider",
  "@adonisjs/cors/providers/CorsProvider",
  "@adonisjs/shield/providers/ShieldProvider",
  "@adonisjs/session/providers/SessionProvider",
  "@adonisjs/auth/providers/AuthProvider",
  "@adonisjs/websocket/providers/WsProvider",
  "@adonisjs/mail/providers/MailProvider",
  "@adonisjs/drive/providers/DriveProvider",
  "@adonisjs/ally/providers/AllyProvider",
  "adonis-acl/providers/AclProvider",
  "adonis-smser/providers/SmserProvider",
  "adonis-drive-google/providers/DriveProvider",
  "@adonisjs/validator/providers/ValidatorProvider",
  "adonis-datatables/providers/DataTablesProvider",
  path.join(__dirname, "..", "providers", "AppProvider"),
  path.join(__dirname, "..", "providers", "PhoneNumberProvider"),
];

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  "@adonisjs/lucid/providers/MigrationsProvider",
  "adonis-acl/providers/CommandsProvider",
];

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Role: "Adonis/Acl/Role",
  Permission: "Adonis/Acl/Permission",
};

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = [];

module.exports = { providers, aceProviders, aliases, commands };
