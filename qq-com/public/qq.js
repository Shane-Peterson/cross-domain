function ajax(method, url, content) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open(method, url)
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if ((request.status >= 200 && request.status < 300) || request.status === 304) {
          resolve(request.response)
        } else {
          reject('Request was unsuccessful: ' + request.status)
        }
      }
    }
    request.send(content)
  })
}

ajax('GET', '/friends.json').then(alert, alert)