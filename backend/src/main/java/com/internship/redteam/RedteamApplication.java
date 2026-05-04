package com.internship.redteam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableMethodSecurity
@EnableScheduling   // 🔥 ADD THIS LINE
public class RedteamApplication {

    public static void main(String[] args) {
        SpringApplication.run(RedteamApplication.class, args);
    }
}