import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/enviroment";
import { Observable } from "rxjs";
import { CreatePost, MyPost, Post, UpdatePost } from "../interfaces/post.interface";

@Injectable()
export class PostDataSource {

    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    getPublicPost(): Observable<Post[]> {
        return this.http.get<Post[]>(`${this.baseUrl}/api/post/get-all-posts`);
    }

    getMyPosts(): Observable<MyPost[]> {
        const token = localStorage.getItem('accessToken'); 
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` 
        });
        return this.http.get<MyPost[]>(`${this.baseUrl}/api/post/get/my-posts` , { headers });
    }

    createNewMyPost(createPost: CreatePost): Observable<MyPost>{
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` 
        });
        return this.http.post<MyPost>(`${this.baseUrl}/api/post/create`, createPost, {headers});
    }

    deleteMyPost(idPost: number): Observable<MyPost>{
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` 
        });
        return this.http.delete<MyPost>(`${this.baseUrl}/api/post/delete-post?postId=${idPost}`, { headers });
    } 

    updateMyPost(updatedPost: UpdatePost): Observable<MyPost>{
        const token = localStorage.getItem('accessToken');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` 
        });

        return this.http.put<MyPost>(`${this.baseUrl}/api/post/update-post`, updatedPost, {headers});
    }
}