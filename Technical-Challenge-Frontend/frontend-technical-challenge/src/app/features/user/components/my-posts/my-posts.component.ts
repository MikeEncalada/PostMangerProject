import { Component, computed, OnInit, Signal } from '@angular/core';
import { CreatePost, MyPost, UpdatePost } from '../../../../core/config/interfaces/post.interface';
import { MyPostsRepository } from '../../../../core/config/model/myposts.repository';
import { AuthService } from '../../../../core/config/services/auth.service';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { UpdatePostDialogComponent } from '../../../../shared/update-post-dialog/update-post-dialog.component';

@Component({
  selector: 'app-my-posts',
  standalone: false,
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.scss'
})
export class MyPostsComponent implements OnInit{

  mypost: Signal<MyPost[]>;

  items: MenuItem[];

  constructor(private myPostsRepository: MyPostsRepository,
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {
    this.mypost = computed(() => {
      return this.myPostsRepository.myposts();
    });

    this.items = [
      {
        icon: 'pi pi-pencil',
        tooltipOptions: {
          tooltipLabel: 'New Post',
          tooltipPosition: "top"
        },
        command: () => {
          this.openDialog();
        }
      },
      {
        icon: 'pi pi-refresh',
        tooltipOptions: {
          tooltipLabel: 'Refresh Posts',
          tooltipPosition: "top"
        },
        command: () => {
          this.messageService.add({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
        }
      },
    ];
  }
  ngOnInit(): void {
    this.myPostsRepository.resetService()
  }

  deletePost(idPost: number) {
    this.myPostsRepository.deleteMyPost(idPost);
  }

  isDialogVisible: boolean = false;

  openDialog(): void {
    if (!this.auth.authenticated) {
      this.router.navigateByUrl("/auth/login");
      return;
    }
    this.isDialogVisible = true;
  }

  onDialogVisibilityChange(visible: boolean): void {
    this.isDialogVisible = visible;
  }

  createPost(postData: CreatePost): void {
    this.myPostsRepository.createNewPost(postData);
  }


  openUpdateDialog(post: UpdatePost): void {
    const ref = this.dialogService.open(UpdatePostDialogComponent, {
      header: 'Update Post 1',
      width: '500px',
      data: post 
    });

    ref.onClose.subscribe((updatedPost: UpdatePost) => {
      if (updatedPost) {
        this.myPostsRepository.updateMyPost(updatedPost);
        
      }
    });
  }


}
