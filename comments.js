// create web server

var app = http.createServer(function (request, response) {
    // 2.1. when user requests something from the server
    // 2.1.1. get query data from the URL
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    // 2.1.2. get pathname from the URL 
    var pathname = url.parse(_url, true).pathname;
    // 2.1.3. if user requests the root path
    if (pathname === '/') {
//root path code        
    }// 2.1.4. if user requests the path other than root
    else {
//other path code        
    }
    
    

