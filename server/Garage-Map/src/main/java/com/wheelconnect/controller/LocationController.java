package com.wheelconnect.controller;

import com.wheelconnect.dto.LocationDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class LocationController {

    private final SimpMessagingTemplate messagingTemplate;

    public LocationController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // 🔥 Mechanic sends location here
    @MessageMapping("/mechanic-location")
    public void receiveLocation(@Payload LocationDTO payload) {

        if (payload.getBookingId() == null) {
            System.out.println("❌ bookingId missing");
            return;
        }

        System.out.println("📥 Received: " +
            payload.getBookingId() + " | " +
            payload.getLat() + "," + payload.getLng()
        );

        // 🚀 Send to specific booking topic
        String destination = "/topic/booking/" + payload.getBookingId();

        messagingTemplate.convertAndSend(destination, payload);

        System.out.println("📤 Sent to: " + destination);
    }
}