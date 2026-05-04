package com.internship.redteam.service;

import com.internship.redteam.entity.User;
import com.internship.redteam.repository.UserRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    // ✅ Test Create User
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

    // ✅ Test Get User By ID (Success)
    @Test
    void testGetUserById_Success() {

        User user = new User();
        user.setId(1L);
        user.setEmail("test@gmail.com");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User result = userService.getUserById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    // ✅ Test Get User By ID (Not Found)
    @Test
    void testGetUserById_NotFound() {

        when(userRepository.findById(10L)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.getUserById(10L);
        });

        assertEquals("User not found with id: 10", exception.getMessage());
    }

    // ✅ Test Login Success
    @Test
    void testLogin_Success() {

        User user = new User();
        user.setEmail("test@gmail.com");
        user.setPassword("hashed");

        when(userRepository.findByEmail("test@gmail.com")).thenReturn(user);
        when(passwordEncoder.matches("123", "hashed")).thenReturn(true);

        User result = userService.login("test@gmail.com", "123");

        assertNotNull(result);
    }

    // ✅ Test Login Failure
    @Test
    void testLogin_Failure() {

        when(userRepository.findByEmail("test@gmail.com")).thenReturn(null);

        User result = userService.login("test@gmail.com", "wrong");

        assertNull(result);
    }
}