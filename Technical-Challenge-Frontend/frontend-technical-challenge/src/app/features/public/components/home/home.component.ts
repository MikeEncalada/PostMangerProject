import { Component, computed, OnInit, Signal } from '@angular/core';
import { PostRepository } from '../../../../core/config/model/post.repository';
import { Post } from '../../../../core/config/interfaces/post.interface';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../../core/config/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  posts: Signal<Post[]>;


  ngOnInit(): void {
    this.postRepository.resetService()
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

    
  }

  

    
}
