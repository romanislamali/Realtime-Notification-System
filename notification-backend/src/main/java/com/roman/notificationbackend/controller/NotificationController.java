package com.roman.notificationbackend.controller;

import com.roman.notificationbackend.model.Notification;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {
    @MessageMapping("/send-notification")
    @SendTo("/topic/notification")
    public Notification sendNotification(Notification notification) {
        return notification;
    }
}
