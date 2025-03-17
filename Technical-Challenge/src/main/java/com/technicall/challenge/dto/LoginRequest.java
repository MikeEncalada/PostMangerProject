package com.technicall.challenge.dto;

public record LoginRequest(
        String email,
        String password
) {
}
