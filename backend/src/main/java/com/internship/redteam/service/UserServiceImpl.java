package com.internship.redteam.service;

import com.internship.redteam.entity.User;
import com.internship.redteam.dto.UserDTO;
import com.internship.redteam.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // ✅ CREATE USER (REGISTER)
    @Override
    @CacheEvict(value = "users", allEntries = true)
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole("USER");
        return userRepository.save(user);
    }

    // ✅ LOGIN
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    // ✅ GET USER BY ID
    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // ✅ GET ALL USERS (DTO + CACHE)
    @Override
    @Cacheable("users")
    public Page<UserDTO> getAllUsers(int page, int size) {

        System.out.println("🔥 Fetching from DB...");

        Page<User> users = userRepository.findAll(PageRequest.of(page, size));

        return users.map(user ->
            new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getCreatedAt()
            )
        );
    }
}