package com.technicall.challenge.dto;

import com.technicall.challenge.Entities.Post;
import com.technicall.challenge.Entities.UserEntity;

import java.util.List;

public class UserMapper {

    public static UserDto toDTO(UserEntity user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        return userDto;
    }

    public static UserDtoWithPosts toDTOWithPosts(UserEntity user) {
        UserDtoWithPosts userDto = new UserDtoWithPosts();
        userDto.setId(user.getId());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());

        List<PostDto> postDtos = user.getPosts().stream()
                .map(PostMapper::toDTO)
                .toList();

        userDto.setPosts(postDtos);

        return userDto;
    }
}
