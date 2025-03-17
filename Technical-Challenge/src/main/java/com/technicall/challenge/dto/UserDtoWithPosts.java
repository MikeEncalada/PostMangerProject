package com.technicall.challenge.dto;


import lombok.Data;

import java.util.List;

@Data
public class UserDtoWithPosts {
    private Long id;
    private String username;
    private String email;
    private List<PostDto> posts;
}
