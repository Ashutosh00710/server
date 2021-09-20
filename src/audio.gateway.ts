import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, { transports: ['websocket'] })
export class AudioGateway {
  @WebSocketServer() server: Server;
  broadcasters = {};

  @SubscribeMessage('register as broadcaster')
  handleRegisterAsBroadcaster(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    room: string,
  ): void {
    console.log('register as broadcaster for room', room);
    this.broadcasters[room] = client.id;
    client.join(room);
  }

  @SubscribeMessage('register as viewer')
  handleRegisterAsViewer(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    user: { id: string; room: string },
  ): void {
    console.log('register as viewer for room', user.room);
    client.join(user.room);
    user.id = client.id;
    client.to(this.broadcasters[user.room]).emit('new viewer', user);
  }

  @SubscribeMessage('candidate')
  handleCandidate(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    [id, event]: [string, any],
  ): void {
    client.to(id).emit('candidate', client.id, event);
  }

  @SubscribeMessage('offer')
  handleOffer(
    @ConnectedSocket() client: Socket,
    @MessageBody() [id, event]: [string, any],
  ): void {
    event.broadcaster.id = client.id;
    client.to(id).emit('offer', event.broadcaster, event.sdp);
  }

  @SubscribeMessage('answer')
  handleAnswer(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    event: any,
  ): void {
    client
      .to(this.broadcasters[event.room])
      .emit('answer', client.id, event.sdp);
  }
}
