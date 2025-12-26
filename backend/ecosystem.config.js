module.exports = {
  apps: [{
    name: "demoapp-backend",
    script: "build/index.js",
    exec_mode: "cluster",
    instances: 4,
  }]
}
