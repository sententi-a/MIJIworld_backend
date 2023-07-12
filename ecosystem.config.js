module.exports = {
  apps: [
    {
      name: "MIJIworld",
      script: "dist/index.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
