var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('缺少端口，\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method
  console.log('正在访问：' + pathWithQuery)
  if (path === '/index.html') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(fs.readFileSync('./public/index.html'))
    response.end()
  } else if (path === '/qq.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('./public/qq.js'))
    response.end()
  } else if (path === '/friends.json') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    try{
      response.setHeader('Access-Control-Allow-Origin', request.headers["referer"].replace(/\/$/,''))
    }catch(e){}
    response.write(fs.readFileSync('./public/friends.json'))
    response.end()
  } else if (path === '/friends.js') {
    if (request.headers["referer"].indexOf("http://shane.com:9999") === 0) {
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
      const string = `window['{{xxx}}']( {{data}} )`
      const data = fs.readFileSync('./public/friends.json').toString()
      const string2 = string.replace('{{data}}', data).replace('{{xxx}}', query.callback)
      response.write(string2)
      response.end()
    } else {
      response.statusCode = 404
      response.end()
    }
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`您访问的页面不存在。`)
    response.end()
  }

})

server.listen(port)
console.log('监听 ' + port + ' 端口成功\n合上眼睛，命中注定的一切，此刻，我们心满意足地接受 http://localhost:' + port)

