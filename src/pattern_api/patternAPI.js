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
    // socket.on('message', function (msg) {
    //   console.log(msg)
    // })
    // socket.on('error', function (msg) {
    //   console.log('error')
    //   console.log(msg)
    // })
  }
}

export default PatternAPI;
