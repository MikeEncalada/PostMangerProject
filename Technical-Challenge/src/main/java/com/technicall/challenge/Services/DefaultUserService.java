package com.technicall.challenge.Services;

import com.technicall.challenge.Entities.UserEntity;
import com.technicall.challenge.Repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DefaultUserService {

    @Value("${default.admin.password}")
    private String defaultAdminPassword;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    @Transactional
    public void createDefaultUser() {
        if (!userRepository.existsByUsername("defaultAdminUser")) {
            UserEntity user = UserEntity.builder()
                    .username("defaultAdminUser")
                    .email("defaultAdmin@gmail.com")
                    .role(UserEntity.Role.ADMIN)
                    .passwordHash(passwordEncoder.encode(defaultAdminPassword))
                    .build();

            userRepository.save(user);
        }
    }
}
