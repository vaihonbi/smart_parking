module.exports = {
  apps: [
    {
      name: "SmartParking-Server-App",
      script: "server.js",
      env: {
        ENV_SILENT: true,
        NODE_ENV: "production",
        PORT: 3001,
        DB_HOST: "localhost",
        DB_PASSWORD: "Dangkiem@1vn",
        MQTT_HOST: "localhost",
      },
    },
  ],
};
