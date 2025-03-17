package com.technicall.challenge.Controllers;

import com.technicall.challenge.Entities.Post;
import com.technicall.challenge.Services.PostService;
import com.technicall.challenge.dto.PostCreateRequest;
import com.technicall.challenge.dto.PostDto;
import com.technicall.challenge.dto.PostDtoWithUser;
import com.technicall.challenge.dto.PostUpdateRequest;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@AllArgsConstructor
public class PostController {

    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<PostDto> createNewUserPost(@RequestBody PostCreateRequest postRequest) {
        PostDto createdPost = postService.createNewPostByUser(postRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @GetMapping("/get/my-posts")
    public ResponseEntity<List<PostDto>> getMyPosts() {
        List<PostDto> myPosts = postService.getMyPosts();
        return ResponseEntity.ok(myPosts);
    }

    @DeleteMapping("/delete-post")
    public ResponseEntity<PostDto> deletePost(@RequestParam Long postId) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.deletePost(postId));
    }

    @PutMapping("/update-post")
    public ResponseEntity<PostDto> updatePost(@RequestBody PostUpdateRequest postUpdateRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(postService.updatePost(postUpdateRequest));

    }

    @GetMapping("/get-all-posts")
    public ResponseEntity<List<PostDtoWithUser>> getPublicPosts() {
        return ResponseEntity.ok(postService.getAllpost());
    }
}
