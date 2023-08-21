module.exports = {
  apps: [
    {
      name: "MIJIworld_backend",
      script: "dist/index.js",
      instances: 0,
      exec_mode: "cluster",
      // 앱 구동 완료 전 ready를 너무 빨리 보내는 경우 대비
      wait_ready: true, // ready 이벤트 기다리기
      listen_timeout: 50000, // ready 이벤트 기다리는 시간
    },
  ],
};
