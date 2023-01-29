import { OnModuleInit } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected')
    })
  }

  @SubscribeMessage('message')
  onMessage(@MessageBody() body: any) {
    console.log(body);
    this.server.emit('message', body);
  }

  @OnEvent('incoming.call')
  handleIncomingCall(data: any) {
    this.server.emit('incoming.call', data);
  }

  @OnEvent('incoming.chat')
  handleIncomingChat(data: any) {
    this.server.emit('incoming.chat', data);
  }

  @OnEvent('incoming.sms')
  handleIncomingSms(data: any) {
    this.server.emit('incoming.sms', data);
  }
}
