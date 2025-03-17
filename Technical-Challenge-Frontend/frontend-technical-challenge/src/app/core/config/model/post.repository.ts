import { Injectable, signal } from "@angular/core";
import { Post } from "../interfaces/post.interface";
import { PostDataSource } from "./post.datasource";

@Injectable()
export class PostRepository{

    publicPosts = signal<Post[]>([]);

    constructor(private postDataSource: PostDataSource){
        postDataSource.getPublicPost().subscribe(data =>
            this.publicPosts.set(data)
        );
    }

    resetService(){
        this.postDataSource.getPublicPost().subscribe(data =>
            this.publicPosts.set(data)
        );
    }

}