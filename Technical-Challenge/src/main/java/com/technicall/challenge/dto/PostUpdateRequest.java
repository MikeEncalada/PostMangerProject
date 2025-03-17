package com.technicall.challenge.dto;

import lombok.Data;

@Data
public class PostUpdateRequest {
    private Long id;
    private String title;
    private String content;
}
