import io from 'socket.io-client';


class PatternAPI {
  constructor(url) {
    this.url = url
    this.socket = null
  }

  connect() {
    const url = this.url
    const socket = io(url)
    this.socket = socket
    socket.on('connect', function () {
      console.log(`connected to pattern API at ${url}`);
    });
    socket.on('message', function (msg) {
      console.log(msg)
    })
    socket.on('error', function (msg) {
      console.log('error')
      console.log(msg)
    })
  }

  emit(event, data) {
    const socket = this.socket
    socket.emit(event, data)
  }

  on(event, callback) {
    const socket = this.socket
    this.removeCallback(event)
    socket.on(event, callback)
  }

  removeCallback(event) {
    const socket = this.socket
    const eventKey = `\$${event}`
    const callbackAlready = socket._callbacks[eventKey]
    if (callbackAlready !== undefined) {
      socket.off(event)
    }
  }
}

export default PatternAPI;
