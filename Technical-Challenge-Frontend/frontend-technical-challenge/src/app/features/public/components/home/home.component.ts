import { Component, computed, OnInit, Signal } from '@angular/core';
import { PostRepository } from '../../../../core/config/model/post.repository';
import { Post } from '../../../../core/config/interfaces/post.interface';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/config/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  posts: Signal<Post[]>;
  isLoggedIn: boolean;
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.postRepository.resetService()

    this.items = [
      {
          label: 'User',
          items: [
              {
                  label: 'My Posts',
                  command: () => this.router.navigate(['/user/my-posts']),
                  
              },
              {
                  label: 'Log out',
                  command: () => {
                    this.auth.clear();
                    this.router.navigateByUrl("/auth/login");
                  }
                 
              }
          ]
      }
  ];
  }


  constructor(
    private postRepository: PostRepository,
    private messageService: MessageService,
    private auth: AuthService,
    private router: Router
  ) {
    this.posts = computed(() => {
      return this.postRepository.publicPosts();
    });

    this.isLoggedIn = this.auth.authenticated;
  }

  

    
}
