
# linkedin-oauth-agent

  Bare bones, low-level agent for authenticating with LinkedIn's oAuth.

  Uses both a client-side and server-side library to make the oAuth handshake more understandable.

  This library does not make any assumptions about your server-side architecture, allowing it to easily adapt to any setup.

## Example

**client.js**

```js
var LinkedIn = require('linkedin-oauth-agent');

// Open popup
LinkedIn({
  client_id: client_id,
  scope: 'profile'
}, function(err, code) {
  // send "code" to server.js
})
```

**server.js**

```js
var LinkedIn = require('linkedin-oauth-agent');

// received "code" from client
LinkedIn({
  code: code,
  client_id: client_id,
  client_secret: client_secret,
  redirect_uri: redirect_uri,
}, function(err, profile) {
  // "profile" will contain your linkedin information
});

```

## Installation

```
npm install linkedin-oauth-agent
```

## See also:

- [google-oauth-agent](https://github.com/lapwinglabs/google-oauth-agent)
- [facebook-oauth-agent](https://github.com/lapwinglabs/facebook-oauth-agent)
- [twitter-oauth-agent](https://github.com/lapwinglabs/twitter-oauth-agent)

## Credits

Most of this code is distilled from the [satellizer](https://github.com/sahat/satellizer) project.

## License

(The MIT License)

Copyright (c) 2015 Matthew Mueller &lt;matt@lapwinglabs.com&gt;
