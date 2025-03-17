package com.technicall.challenge.dto;

public record RegisterRequest(
        String username,
        String email,
        String password
) {
}
