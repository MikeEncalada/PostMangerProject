package com.technicall.challenge.Services;

import com.technicall.challenge.Entities.UserEntity;
import com.technicall.challenge.Repositories.UserRepository;
import com.technicall.challenge.dto.UserDto;
import com.technicall.challenge.dto.UserMapper;
import com.technicall.challenge.dto.UserUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    public UserEntity getCurrentUserEntity() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {

            String userEmail = authentication.getName();

            return userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        }
        throw new RuntimeException("Usuario no autenticado");
    }



    public List<UserDto> getAllUsers(){
        return userRepository.findAll().stream()
                .map(UserMapper::toDTO)
                .toList();
    }

    public UserDto updateUser(UserUpdateRequest userUpdateRequest) {
        UserEntity user = userRepository.findById(userUpdateRequest.getId())
                .orElseThrow(() -> new RuntimeException("Not Found User"));

        user.setUsername(userUpdateRequest.getUsername());
        user.setEmail(userUpdateRequest.getEmail());
        user.setRole(UserEntity.Role.valueOf(userUpdateRequest.getRole()));

        UserEntity updatedUser = userRepository.save(user);

        return UserMapper.toDTO(updatedUser);

    }

    public UserDto deleteUser(Long userId) {
        UserEntity selectedUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("Not Found User"));
        selectedUser.setDeletedAt(LocalDateTime.now());
        userRepository.delete(selectedUser);

        return UserMapper.toDTO(selectedUser);
    }

}
