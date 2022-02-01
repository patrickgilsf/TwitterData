import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Twitter from 'twitter-v2';
import fetch from 'node-fetch';
const tempToken = 'Bearer Q2E5ZkY2WDNreTdXdVp1NEF1cWszRmVHdHNOdDFLQ3pPWGc4cnZzY0pmUWFhOjE2NDM2OTczODk1ODA6MToxOmF0OjE';

const TwitterKey = process.env.TwitterKey;
const TwitterSecret = process.env.TwitterSecret;

const client = new Twitter({
    consumer_key: TwitterKey,
    consumer_secret: TwitterSecret,
  });
//client.get('https://api.twitter.com/2/users/17296100/tweets')

//api keygen/auth
const payload = {
    iss: TwitterKey,
    exp: ((new Date()).getTime() + 5000)
};
const token = jwt.sign(payload, TwitterSecret);
//console.log('token: ' + token)

const twitterConsumerKey = process.env.TwitterKey;
const twitterConsumerSecret = process.env.TwitterSecret;

//the consumer key 'RFC 1738 encoded'
const rfcKey = encodeURI(twitterConsumerKey);
//the consumer secret 'RFC 1738 encoded'
const rfcSecret = encodeURI(twitterConsumerSecret);
//make the bearer token credential string - 
//the rfc encoded key : the rfc encoded secret
const bearerTokenCredentials = `${rfcKey}:${rfcSecret}`;
//encode the credentials to base 64
const base64BearerTokenCredentials = Buffer.from(
    bearerTokenCredentials
).toString('base64');
//create the options object for node-fetch
const options = {
    headers: {
        accept: 'gzip',
        //use your authorization string
        Authorization: 'Basic ' + base64BearerTokenCredentials,
        'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    body: 'grant_type=client_credentials',
};
const response = await fetch('https://api.twitter.com/oauth2/token', options);
const bearerToken = await response.json();
//console.log(bearerToken)
const consumerToken = 'Bearer: ' + bearerToken.access_token;
console.log(consumerToken);

//URLs
const baseUrl = 'https://api.twitter.com/2/';

//Tweet Lookup
var twLookup = 'tweets/:id';
//Tweet Lookup (Multiple)
var twLookupMult = 'tweets';
//User Lookup
var userLookup = 'users/:id';
//My ID
var myId = 'users/me';
//Users
var users = '/users';
//Users By
var usersBy = '/users/by'
var twitterOptions = {  
    headers: {
        Authorization: tempToken
    },
    params: {
        max_results: '100'
    }
}

axios.get('https://api.twitter.com/2/users/17296100/tweets', twitterOptions)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err);
    })

    //'Authorization: OAuth oauth_consumer_key="$oauth_consumer_key", oauth_nonce="$oauth_nonce", oauth_signature="oauth_signature", oauth_signature_method="HMAC-SHA1", oauth_timestamp="$timestamp", oauth_version="1.0"'


    //curl --request GET 'https://api.twitter.com/2/users/by/username/USER_NAME

    //curl -H "Authorization: Bearer WEw0RDJ5YUViZ0x3V2M2TktHcURlYmJsVWhlcDhkSUlBUHdlMjhRTzFWd0xaOjE2NDM2OTIwNDgxMTQ6MToxOmF0OjE" "https://api.twitter.com/2/users/me"

    //https://api.twitter.com/2/users/:id/tweets

    //curl -H "Authorization: Bearer Q2E5ZkY2WDNreTdXdVp1NEF1cWszRmVHdHNOdDFLQ3pPWGc4cnZzY0pmUWFhOjE2NDM2OTczODk1ODA6MToxOmF0OjE" "https://api.twitter.com/2/users/me"