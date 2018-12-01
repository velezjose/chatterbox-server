/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var body = {
  results: []
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);


  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  if (request.method === 'POST' && request.url === '/classes/messages') {
    
    request.on('data', (chunk) => {
      body.results.push(JSON.parse(chunk));
    }).on('end', () => {
      response.writeHead(201, headers);
      response.end(JSON.stringify(body.results));
    });
    
  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    
    headers['Content-Type'] = 'application/json';
    response.writeHead(200, headers);
    response.end(JSON.stringify(body));

  } else {
    response.writeHead(404, 'Error: Invalid URL');
    response.end();
  }
  
};

exports.requestHandler = requestHandler;


// Tell the client we are sending them plain text.
//
// You will need to change this if you are sending something
// other than plain text, like JSON or HTML.


// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.


// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.
  

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.