function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = 'shaneJSONPCallbackName' + Math.random()
    window[random] = (data) => {
      resolve.call(null, data)
    }
    const script = document.createElement('script')
    script.src = `${url}?callback=${random}`
    script.onload = () => {
      script.remove()
    }
    script.onerror = () => {
      reject('request was unsuccessful')
    }
    document.body.appendChild(script)
  })

}

jsonp('http://qq.com:8888/friends.js')
  .then(console.log, console.log)

function ajax(method, url, content){
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    request.onreadystatechange = () => {
      if (request.readyState === 4){
        if ((request.status >= 200 && request.status < 300) || request.status === 304) {
          resolve(request.response)
        }else {
          reject('request was unsuccessful: ' + request.status)
        }
      }
    }
    if (arguments.length === 3){
      request.send(content)
    } else if(arguments.length ===2){
      request.send()
    }
  })
}

ajax('GET', 'http://qq.com:8888/friends.json').then(console.log, console.log)