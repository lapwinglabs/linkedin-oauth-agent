/**
 * Module Dependencies
 */

var querystring = require('querystring');
var assign = require('object-assign');
var open = require('oauth-open');
var assert = require('assert');
var isArray = Array.isArray;

/**
 * Export `LinkedIn`
 */

module.exports = LinkedIn;

/**
 * Base endpoint
 */

var endpoint = 'https://www.linkedin.com/uas/oauth2/authorization';

/**
 * Default options
 */

var defaults = {
  redirect_uri:  document.location.href,
  scope: ['r_emailaddress'],
  state: 'STATE'
};

/**
 * LinkedIn provider
 */

function LinkedIn(obj, fn) {
  obj = assign(defaults, obj);
  assert(obj.client_id, 'linkedin provider requires a "client_id"');

  var url = endpoint + '?' + qs(obj);
  open(url, function(err, data) {
    if (err) return fn(err);
    return fn(null, data.code);
  });
}

/**
 * Scope
 */

function scope(scope) {
  var scope = isArray(scope) ? scope.join(' ') : scope;
  return scope;
}

/**
 * Build the querystring
 */

function qs(options) {
  return querystring.stringify({
    client_id: options.client_id,
    redirect_uri: options.redirect_uri,
    scope: scope(options.scope),
    state: options.state,
    response_type: 'code'
  });
}
