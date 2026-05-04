package com.internship.redteam.service;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendHtmlEmail(String to, String name) {

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            // 🔥 Prepare Thymeleaf template
            Context context = new Context();
            context.setVariable("name", name);

            String htmlContent = templateEngine.process("email-template", context);

            helper.setTo(to);
            helper.setSubject("Welcome Email 🚀");
            helper.setText(htmlContent, true);

            mailSender.send(message);

            System.out.println("📧 HTML Email sent successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}