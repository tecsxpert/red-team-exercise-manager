package com.internship.redteam;

import com.internship.redteam.entity.Exercise;
import com.internship.redteam.entity.User;
import com.internship.redteam.repository.ExerciseRepository;
import com.internship.redteam.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            for (int i = 1; i <= 30; i++) {
                User user = new User();
                user.setName("User" + i);
                user.setEmail("user" + i + "@test.com");
                user.setPassword(encoder.encode("123456"));
                user.setRole(i == 1 ? "ADMIN" : "USER");
                userRepository.save(user);
            }
            System.out.println("30 users inserted");
        }

        if (exerciseRepository.count() == 0) {
            String[][] data = {
                {"Network Penetration Test", "Testing internal network security vulnerabilities", "IN_PROGRESS", "HIGH", "Sandhyarani"},
                {"Social Engineering Assessment", "Evaluating employee awareness against phishing attacks", "PLANNED", "MEDIUM", "Prajwal"},
                {"Web Application Security Audit", "Testing OWASP Top 10 vulnerabilities", "COMPLETED", "CRITICAL", "Namratha"},
                {"Physical Security Review", "Testing physical access controls", "PLANNED", "LOW", "Santosh"},
                {"Password Policy Assessment", "Reviewing password policies across systems", "IN_PROGRESS", "MEDIUM", "Shreyanka"},
                {"Firewall Configuration Audit", "Testing firewall rules and network segmentation", "COMPLETED", "HIGH", "Sandhyarani"},
                {"Database Security Assessment", "Testing database access controls", "PLANNED", "CRITICAL", "Prajwal"},
                {"API Security Testing", "Testing REST API endpoints for vulnerabilities", "IN_PROGRESS", "HIGH", "Namratha"},
                {"Cloud Security Review", "Assessing cloud infrastructure security", "COMPLETED", "MEDIUM", "Santosh"},
                {"Mobile Application Security", "Testing mobile app security", "PLANNED", "LOW", "Shreyanka"},
                {"Email Security Assessment", "Testing email filtering and anti-phishing", "IN_PROGRESS", "MEDIUM", "Sandhyarani"},
                {"Incident Response Drill", "Testing incident response procedures", "COMPLETED", "HIGH", "Prajwal"},
                {"Wireless Network Security", "Testing wireless network security", "PLANNED", "MEDIUM", "Namratha"},
                {"Third Party Vendor Assessment", "Evaluating security of third party vendors", "IN_PROGRESS", "HIGH", "Santosh"},
                {"Security Awareness Training", "Conducting security awareness training", "COMPLETED", "LOW", "Shreyanka"}
            };
            for (int i = 0; i < data.length; i++) {
                Exercise exercise = new Exercise();
                exercise.setTitle(data[i][0]);
                exercise.setDescription(data[i][1]);
                exercise.setStatus(data[i][2]);
                exercise.setSeverity(data[i][3]);
                exercise.setAssignedTo(data[i][4]);
                exercise.setStartDate(LocalDateTime.now().minusDays(30 - i * 2));
                exercise.setEndDate(LocalDateTime.now().plusDays(i * 3));
                exercise.setIsDeleted(false);
                exerciseRepository.save(exercise);
            }
            System.out.println("15 exercises inserted");
        }
    }
}