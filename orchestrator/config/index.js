const appBaseUrl = "http://localhost:3000";
const userBaseUrl = "http://localhost:3001";
const forumBaseUrl = "http://localhost:3002";
const chatBaseUrl = "http://localhost:3003";

const Redis = require("ioredis");
const redis = new Redis("redis://default:RjkQCh09E9fnDHLPsc8x4SJ4NHrs3b32@redis-10599.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:10599/0");

module.exports = { appBaseUrl, userBaseUrl, forumBaseUrl, chatBaseUrl, redis };
