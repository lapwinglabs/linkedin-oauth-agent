/**
 * Module dependencies
 */

var superagent = require('superagent');
var assert = require('assert');

/**
 * Export `LinkedIn`
 */

module.exports = LinkedIn;

/**
 * Access Token Endpoint
 */

var access_token_endpoint = 'https://www.linkedin.com/uas/oauth2/accessToken';

/**
 * API Endpoint
 */

var api_endpoint = 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address,picture-url)';

/**
 * Initialize `LinkedIn`
 */

function LinkedIn(obj, fn) {
  assert(obj.code, 'linkedin authentication requires a "code"');
  assert(obj.client_id, 'linkedin authentication requires a "client_id"');
  assert(obj.client_secret, 'linkedin authentication requires a "client_secret"');
  assert(obj.redirect_uri, 'linkedin authentication requires a "redirect_uri"');

  var query = {
    code: obj.code,
    client_id: obj.client_id,
    client_secret: obj.client_secret,
    redirect_uri: obj.redirect_uri,
    grant_type: 'authorization_code'
  };

  // get the access token and request the profile
  fetch_token(query, function(err, token) {
    if (err) return fn(err);
    fetch_profile(token, fn);
  })
}

/**
 * Get the token
 */

function fetch_token(obj, fn) {
  superagent
    .post(access_token_endpoint)
    .accept('json')
    .type('form')
    .send(obj)
    .end(function(err, res) {
      if (!res.ok) return fn(new Error(res.body.error_description));
      return fn(null, res.body.access_token);
    });
}

/**
 * Fetch profile
 */

function fetch_profile(token, fn) {
  superagent
    .get(api_endpoint)
    .query({ oauth2_access_token: token, format: 'json' })
    .accept('json')
    .end(function(err, res) {
      if (!res.ok) return fn(new Error(res.body.message));
      return fn(null, res.body);
    })
}
