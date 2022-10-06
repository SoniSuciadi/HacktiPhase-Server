const Redis = require("ioredis");
const redis = new Redis(
  "redis://default:iY7GDyQTjlbHOUfu7SRv0rTWNDP8bJf1@redis-13467.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:13467"
);

module.exports = redis;
