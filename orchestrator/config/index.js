const appBaseUrl = "https://hacktiphase-app.herokuapp.com";
const userBaseUrl = "https://hacktiphase-user.herokuapp.com";
const forumBaseUrl = "https://hacktiphase-forum.herokuapp.com";
const chatBaseUrl = "https://hacktiphase-chat.herokuapp.com";

const Redis = require("ioredis");
const redis = new Redis("redis://default:RjkQCh09E9fnDHLPsc8x4SJ4NHrs3b32@redis-10599.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:10599/0");

module.exports = { appBaseUrl, userBaseUrl, forumBaseUrl, chatBaseUrl, redis };
