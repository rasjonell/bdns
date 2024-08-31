import * as dgram from 'dgram';
import { DNS } from './dns';

const udpSocket: dgram.Socket = dgram.createSocket('udp4');
udpSocket.bind(2053, '127.0.0.1');

udpSocket.on('message', (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
  try {
    console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`, data.toString());

    const response = DNS.generateResponse(data);

    udpSocket.send(response, remoteAddr.port, remoteAddr.address);
  } catch (e) {
    console.log(`Error sending data: ${e}`);
  }
});
