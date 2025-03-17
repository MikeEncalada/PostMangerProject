package com.technicall.challenge.Controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.technicall.challenge.Entities.Post;
import com.technicall.challenge.Entities.UserEntity;
import com.technicall.challenge.Repositories.PostRepository;
import com.technicall.challenge.Services.PostService;
import com.technicall.challenge.dto.PostCreateRequest;
import com.technicall.challenge.dto.PostDto;
import com.technicall.challenge.dto.PostDtoWithUser;
import com.technicall.challenge.dto.PostUpdateRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.http.MediaType;

@ExtendWith(MockitoExtension.class)
public class PostControllerTest {

    @Mock
    private PostService postService;

    @InjectMocks
    private PostController postController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(postController).build();
        objectMapper = new ObjectMapper();
    }

    @Test
    public void testCreateNewUserPost() throws Exception {

        PostCreateRequest postRequest = new PostCreateRequest("Test Title", "Test Content");
        PostDto postDto = new PostDto();
        postDto.setId(1L);
        postDto.setTitle("Test Title");
        postDto.setContent("Test Content");

        when(postService.createNewPostByUser(postRequest)).thenReturn(postDto);

        mockMvc.perform(post("/api/post/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(postRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Title"))
                .andExpect(jsonPath("$.content").value("Test Content"));

        verify(postService, times(1)).createNewPostByUser(postRequest);
    }

    @Test
    public void testGetMyPosts() throws Exception {

        PostDto postDto = new PostDto();
        postDto.setId(1L);
        postDto.setTitle("Test Title");
        postDto.setContent("Test Content");
        List<PostDto> myPosts = Collections.singletonList(postDto);

        when(postService.getMyPosts()).thenReturn(myPosts);

        // Act & Assert
        mockMvc.perform(get("/api/post/get/my-posts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Test Title"))
                .andExpect(jsonPath("$[0].content").value("Test Content"));

        verify(postService, times(1)).getMyPosts();
    }

}
