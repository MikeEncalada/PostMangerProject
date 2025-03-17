import { Injectable, signal } from "@angular/core";
import { CreatePost, MyPost, Post, UpdatePost } from "../interfaces/post.interface";
import { PostDataSource } from "./post.datasource";

@Injectable()
export class MyPostsRepository{
    myposts = signal<MyPost[]>([]);

    constructor(private postDataSource: PostDataSource) {
        this.postDataSource.getMyPosts().subscribe(data => 
            this.myposts.set(data)
        );
        
    }

    createNewPost(createPost: CreatePost){
        this.postDataSource.createNewMyPost(createPost)
            .subscribe(p => {
                this.myposts.update(posts => [...posts, p])
            });
    }   

    deleteMyPost(idPost: number){
        this.postDataSource.deleteMyPost(idPost)
            .subscribe(p =>{
                this.myposts.update(p => p.filter(post => post.id !== idPost));
            })
    }

    updateMyPost(updatedPost: UpdatePost){
        this.postDataSource.updateMyPost(updatedPost)
            .subscribe(p => {
                this.myposts.update(posts => {
                    return posts.map(post => 
                        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
                    );
                });
            });
    }

    getPostById(idPost: number): MyPost | undefined{
        return this.myposts().find(p => p.id == idPost);
    }

    resetService(){
        this.postDataSource.getMyPosts().subscribe(data => 
            this.myposts.set(data)
        );
    }
}