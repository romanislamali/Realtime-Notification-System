import {Component, OnInit} from '@angular/core';
import {WebSocketService} from "../WebSocketService";

@Component({
  selector: 'app-notification-component',
  templateUrl: './notification-component.component.html',
  styleUrls: ['./notification-component.component.css']
})
export class NotificationComponentComponent implements OnInit{

  notifications = [];

  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.getNotifications().subscribe((notification) => {
      // @ts-ignore
      this.notifications.push(notification);
    });
  }

  sendNotification() {
    const newNotification = { content: 'New notification!' };
    this.webSocketService.sendNotification(newNotification);
  }
}
