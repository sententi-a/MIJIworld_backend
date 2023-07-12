module.exports = {
  apps: [
    {
      name: "MIJIworld_backend",
      script: "dist/index.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
