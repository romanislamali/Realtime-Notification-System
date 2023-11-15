import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: any;

  private notificationsSubject = new Subject<any>();

  constructor() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8080/websocket-example');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/notification', (message:any) => {
        this.notificationsSubject.next(JSON.parse(message.body));
      });
    });
  }

  getNotifications() {
    return this.notificationsSubject.asObservable();
  }

  sendNotification(notification:any) {
    this.stompClient.send('/app/send-notification', {}, JSON.stringify(notification));
  }
}
