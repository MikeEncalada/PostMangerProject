package com.technicall.challenge.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private String status;
    private LocalDateTime at_created;
}
