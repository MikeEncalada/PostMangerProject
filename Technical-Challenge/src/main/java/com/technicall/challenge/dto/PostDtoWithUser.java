package com.technicall.challenge.dto;


import lombok.Data;

@Data
public class PostDtoWithUser {
    private Long id;
    private String title;
    private String content;
    private String status;
    private UserDto user;
}
