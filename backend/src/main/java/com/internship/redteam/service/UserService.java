package com.internship.redteam.service;

import com.internship.redteam.entity.User;
import com.internship.redteam.dto.UserDTO;   // 🔥 ADD THIS

import org.springframework.data.domain.Page;

public interface UserService {

    User createUser(User user);

    User getUserById(Long id);

    // 🔥 UPDATED TO DTO
    Page<UserDTO> getAllUsers(int page, int size);
}