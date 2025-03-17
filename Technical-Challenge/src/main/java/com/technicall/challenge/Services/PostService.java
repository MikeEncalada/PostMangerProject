package com.technicall.challenge.Services;

import com.technicall.challenge.Entities.Post;
import com.technicall.challenge.Entities.UserEntity;
import com.technicall.challenge.Repositories.PostRepository;
import com.technicall.challenge.dto.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@AllArgsConstructor
public class PostService {

   private PostRepository postRepository;
   private UserService userService;

   @Transactional
   public PostDto createNewPostByUser(PostCreateRequest postCreateRequest) {
        UserEntity currentUser = userService.getCurrentUserEntity();
        Post post = Post.builder()
                .title(postCreateRequest.title())
                .content(postCreateRequest.content())
                .userEntity(currentUser)
                .status(Post.Status.PUBLISHED)
                .build();
        postRepository.save(post);

        return PostMapper.toDTO(post);

   }

   public List<PostDto> getMyPosts(){
       UserEntity currentUser = userService.getCurrentUserEntity();
       List<Post> myPosts =  postRepository.findByUserEntity(currentUser);

       return myPosts.stream()
               .map(PostMapper::toDTO)
               .toList();
   }

   @Transactional
   public PostDto deletePost(Long postId) {
       UserEntity currentUser = userService.getCurrentUserEntity();

       Post selectedPost = postRepository.findById(postId)
               .orElseThrow(() -> new RuntimeException("Not Found Post"));

       if (!selectedPost.getUserEntity().getId().equals(currentUser.getId())) {
           throw new RuntimeException("You Can´t Delete this Post");
       }

       postRepository.delete(selectedPost);

       return PostMapper.toDTO(selectedPost);
   }

   @Transactional
   public PostDto updatePost(PostUpdateRequest postUpdateRequest) {

       UserEntity currentUser = userService.getCurrentUserEntity();

       Post post = postRepository.findById(postUpdateRequest.getId())
               .orElseThrow(() -> new RuntimeException("Post not found"));


       if (!post.getUserEntity().getId().equals(currentUser.getId())) {
           throw new RuntimeException("You Can´t Update this Post");
       }

       post.setTitle(postUpdateRequest.getTitle());
       post.setContent(postUpdateRequest.getContent());
       post.setUpdatedAt(LocalDateTime.now());

       Post updatedPost = postRepository.save(post);

       return PostMapper.toDTO(updatedPost);

   }

   public List<PostDtoWithUser> getAllpost(){
        List<Post> allPosts = postRepository.findAll();
        return allPosts.stream()
                .map(PostMapper::toDTOWithUser)
                .toList();
   }

   public PostDto updateAPost(PostUpdateRequest postUpdateRequest) {

       Post post = postRepository.findById(postUpdateRequest.getId())
               .orElseThrow(() -> new RuntimeException("Post not found"));

       post.setTitle(postUpdateRequest.getTitle());
       post.setContent(postUpdateRequest.getContent());
       post.setUpdatedAt(LocalDateTime.now());

       Post updatedPost = postRepository.save(post);

       return PostMapper.toDTO(updatedPost);

   }

   public PostDto deleteAPost(Long postId) {
       Post selectedPost = postRepository.findById(postId)
               .orElseThrow(() -> new RuntimeException("Not Found Post"));

       postRepository.delete(selectedPost);

       return PostMapper.toDTO(selectedPost);
   }

}
