package com.technicall.challenge.Services;

import com.technicall.challenge.Entities.Post;
import com.technicall.challenge.Entities.UserEntity;
import com.technicall.challenge.Repositories.PostRepository;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {

    @Mock
    private PostRepository postRepository;

    @Mock
    private UserService userService;

    @InjectMocks
    private PostService postService;

    private UserEntity currentUser;
    private Post post;
    private PostCreateRequest postCreateRequest;
    private PostUpdateRequest postUpdateRequest;

    @BeforeEach
    public void setUp() {
        currentUser = new UserEntity();
        currentUser.setId(1L);
        currentUser.setUsername("testUser");

        post = Post.builder()
                .id(1L)
                .title("Test Title")
                .content("Test Content")
                .userEntity(currentUser)
                .status(Post.Status.PUBLISHED)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        postCreateRequest = new PostCreateRequest("Test Title", "Test Content");
        postUpdateRequest = new PostUpdateRequest();
        postUpdateRequest.setId(1L);
        postUpdateRequest.setTitle("Updated Title");
        postUpdateRequest.setContent("Updated Content");
    }

    @Test
    public void testCreateNewPostByUser() {

        when(userService.getCurrentUserEntity()).thenReturn(currentUser);
        when(postRepository.save(any(Post.class))).thenReturn(post);

        PostDto result = postService.createNewPostByUser(postCreateRequest);

        assertNotNull(result);
        assertEquals("Test Title", result.getTitle());
        assertEquals("Test Content", result.getContent());
        verify(postRepository, times(1)).save(any(Post.class));
    }

    @Test
    public void testGetMyPosts() {

        when(userService.getCurrentUserEntity()).thenReturn(currentUser);
        when(postRepository.findByUserEntity(currentUser)).thenReturn(List.of(post));

        List<PostDto> result = postService.getMyPosts();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Title", result.get(0).getTitle());
    }

    @Test
    public void testDeletePost() {

        when(userService.getCurrentUserEntity()).thenReturn(currentUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));


        PostDto result = postService.deletePost(1L);

        assertNotNull(result);
        assertEquals("Test Title", result.getTitle());
        verify(postRepository, times(1)).delete(post);
    }

    @Test
    public void testDeletePost_ThrowsExceptionWhenNotOwner() {

        UserEntity anotherUser = new UserEntity();
        anotherUser.setId(2L);
        when(userService.getCurrentUserEntity()).thenReturn(anotherUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));

        assertThrows(RuntimeException.class, () -> postService.deletePost(1L));
    }

    @Test
    public void testUpdatePost() {

        when(userService.getCurrentUserEntity()).thenReturn(currentUser);
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        when(postRepository.save(any(Post.class))).thenReturn(post);

        PostDto result = postService.updatePost(postUpdateRequest);

        assertNotNull(result);
        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated Content", result.getContent());
        verify(postRepository, times(1)).save(post);
    }

    @Test
    public void testGetAllpost() {

        when(postRepository.findAll()).thenReturn(List.of(post));

        List<PostDtoWithUser> result = postService.getAllpost();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Title", result.get(0).getTitle());
    }



}
