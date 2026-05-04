package com.internship.redteam.scheduler;

import com.internship.redteam.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class EmailScheduler {

    @Autowired
    private EmailService emailService;

    // 🔥 Runs every day at 9:00 AM
    @Scheduled(cron = "0 0 9 * * ?")
    public void checkDeadlineAndSendEmail() {

        System.out.println("⏰ Running daily scheduler...");

        LocalDate today = LocalDate.now();
        LocalDate deadline = LocalDate.now(); // 🔥 replace with DB later

        // 🔥 CONDITION
        if (deadline.equals(today)) {

            System.out.println("📢 Deadline today! Sending email...");

            emailService.sendHtmlEmail(
                    "santoshchougule541@gmail.com",   // 🔥 replace with your email
                    "Santosh"
            );

        } else {
            System.out.println("✅ No deadlines today");
        }
    }
}