package com.internship.redteam.scheduler;

import com.internship.redteam.entity.User;
import com.internship.redteam.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
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
                System.out.println("30 users inserted ✓");
            }
        };
    }
}
