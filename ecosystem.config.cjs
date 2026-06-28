// Конфигурация pm2. Едет внутри standalone-бандла; __dirname указывает на текущий релиз.
module.exports = {
  apps: [
    {
      name: "md-supply",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
