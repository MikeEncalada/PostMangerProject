import { Injectable, signal, Signal } from "@angular/core";
import { User, UserForAdmin } from "../interfaces/user.interface";
import { AdminDataSource } from "./admin.datasource";
import { Post } from "../interfaces/post.interface";

@Injectable()
export class AdminRepository{

    allUsers = signal<UserForAdmin[]>([]);

    allPosts = signal<Post[]>([]);

    constructor(private adminDatasource: AdminDataSource) {
        this.adminDatasource.getAllUsers().subscribe(data => {
            this.allUsers.set(data);
        });

        this.adminDatasource.getAllPosts().subscribe(data => {
            this.allPosts.set(data);
        });
        
    }


    reset(){
        this.adminDatasource.getAllUsers().subscribe(data => {
            this.allUsers.set(data);
        });
    }

}