import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() { 
    this.socket = io('http://localhost:6001');
  }
  joinRoom(roomId: string) {
    this.socket.emit('join', roomId);
  }
  sendMessage(roomId: string, message: string) {
    this.socket.emit('message', { roomId, message });
  }
  receiveMessage(callback: (message: string) => void) {
    this.socket.on('message', (data: any) => {
      callback(data.message);
    });
  }

}
