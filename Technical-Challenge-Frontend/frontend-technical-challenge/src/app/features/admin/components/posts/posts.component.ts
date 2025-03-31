import { Component, computed, OnInit, Signal } from '@angular/core';
import { Post } from '../../../../core/config/interfaces/post.interface';
import { AdminRepository } from '../../../../core/config/model/admin.repository';
import { AuthService } from '../../../../core/config/services/auth.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: false,
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {

  allPosts: Signal<Post[]>;

  isLoggedIn: boolean;

  itemsAvatar: MenuItem[] | undefined;

  constructor(private adminRepository: AdminRepository, private auth: AuthService, private router: Router) {
    this.allPosts = computed(() => {
      return this.adminRepository.allPosts();
    });
    this.isLoggedIn = this.auth.authenticated;
  }
  ngOnInit(): void {
    this.itemsAvatar = [
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

  getMenuItems(post: Post): MenuItem[] {
      return [
        {
          label: 'Options',
          items: [
            {
              icon: 'pi pi-pencil',
              label: 'Update',

  
  
            },
            {
              icon: 'pi pi-trash',
              label: 'Delete',

  
            }
          ]
        }];
    }

}
