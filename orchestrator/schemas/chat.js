const { gql } = require("apollo-server");
const { apiApp } = require("../configs/axios");
const redis = require("../configs/redis");

const type=gql`
    type message
`