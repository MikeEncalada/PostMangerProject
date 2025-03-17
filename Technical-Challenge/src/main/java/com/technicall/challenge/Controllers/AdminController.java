package com.technicall.challenge.Controllers;


import com.technicall.challenge.Services.PostService;
import com.technicall.challenge.Services.UserService;
import com.technicall.challenge.dto.*;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private PostService postService;
    private UserService userService;

    @GetMapping("/get-posts")
    public ResponseEntity<List<PostDtoWithUser>> getAllPosts(){
        return ResponseEntity.ok(postService.getAllpost());
    }

    @PutMapping("/update-post")
    public ResponseEntity<PostDto> updatePost(@RequestBody PostUpdateRequest postUpdateRequest){
        return ResponseEntity.ok(postService.updateAPost(postUpdateRequest));
    }

    @DeleteMapping("/delete-post")
    public ResponseEntity<PostDto> deletePost(@RequestParam Long postId){
        return ResponseEntity.ok(postService.deleteAPost(postId));
    }

    @GetMapping("/get-users")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/update-user")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserUpdateRequest userUpdateRequest){
        return ResponseEntity.ok(userService.updateUser(userUpdateRequest));
    }

    @DeleteMapping("delete-user")
    public ResponseEntity<UserDto> deleteUser(@RequestParam Long userId){
        return ResponseEntity.ok(userService.deleteUser(userId));
    }

}
