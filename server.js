'use strict'

import * as http from 'http';
import redirects from './redirects.js'

const PORT = process.env.PORT || 3000;

const server = http.createServer(function (req, res) {
  const from = req.url.substring(1);
  const to =  from in redirects ? redirects[from] : null

  if (!from) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Minimal Redirect Server');
    res.end();

    return;
  }

  if (!to) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.write('Redirect Server failed');
    res.end();

    return;
  }

  res.writeHead(302, {
    location: to
  })
  res.end();
});

server.listen(PORT, '0.0.0.0');