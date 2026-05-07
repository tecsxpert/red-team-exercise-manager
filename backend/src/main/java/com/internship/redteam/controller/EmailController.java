package com.internship.redteam.controller;

import com.internship.redteam.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/test")
    public String sendTestEmail() {

        // 🔥 CALL HTML EMAIL METHOD
        emailService.sendHtmlEmail(
                "your_email@gmail.com",   // replace with your email
                "Santosh"
        );

        return "HTML Email sent!";
    }
}