package com.technicall.challenge.dto;

import com.technicall.challenge.Entities.Post;

import java.time.LocalDateTime;

public class PostMapper {
    public static PostDto toDTO(Post post) {
        PostDto postDTO = new PostDto();
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setStatus(post.getStatus().name());
        postDTO.setAt_created(post.getCreatedAt());
        return postDTO;
    }

    public static PostDtoWithUser toDTOWithUser(Post post) {
        PostDtoWithUser postDTO = new PostDtoWithUser();
        postDTO.setId(post.getId());
        postDTO.setTitle(post.getTitle());
        postDTO.setContent(post.getContent());
        postDTO.setStatus(post.getStatus().name());

        UserDto userDto = UserMapper.toDTO(post.getUserEntity());
        postDTO.setUser(userDto);

        return postDTO;
    }
}
