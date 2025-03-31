import { Injectable } from "@angular/core";
import { User, UserForAdmin } from "../interfaces/user.interface";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/enviroment";
import { Observable } from "rxjs";
import { Post } from "../interfaces/post.interface";

@Injectable()
export class AdminDataSource{

    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    getAllUsers(): Observable<UserForAdmin[]>{
        const token = localStorage.getItem('accessToken'); 
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` 
        });

        
        return this.http.get<UserForAdmin[]>(`${this.baseUrl}/api/admin/get-users`, {headers});
    }

    getAllPosts(): Observable<Post[]>{
        const token = localStorage.getItem('accessToken'); 
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}` 
        });

        return this.http.get<Post[]>(`${this.baseUrl}/api/admin/get-posts`, {headers});
    }


}