import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket;
  constructor() {   }

  setupSocketConnection() {
    this.socket = io(environment.socket_url, {
      auth: {
        token: "cloudBurst"
      }
    });

    this.socket.emit('init', 'init track and trace');
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
