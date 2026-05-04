package com.internship.redteam.service;

import com.internship.redteam.entity.User;
import com.internship.redteam.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateUser() {

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setPassword("123");

        when(passwordEncoder.encode("123")).thenReturn("hashed");
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.createUser(user);

        assertNotNull(result);
        assertEquals("USER", result.getRole());
        verify(userRepository, times(1)).save(user);
    }
}