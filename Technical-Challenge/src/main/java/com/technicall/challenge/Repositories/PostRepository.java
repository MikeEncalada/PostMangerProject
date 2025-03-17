package com.technicall.challenge.Repositories;

import com.technicall.challenge.Entities.Post;
import com.technicall.challenge.Entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserEntity(UserEntity userEntity);
}
