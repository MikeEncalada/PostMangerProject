import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavBarComponent } from '../layouts/top-nav-bar/top-nav-bar.component';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { CreatePostDialogComponent } from './create-post-dialog/create-post-dialog.component';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPostsRepository } from '../core/config/model/myposts.repository';
import { PostDataSource } from '../core/config/model/post.datasource';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    TopNavBarComponent,
    CreatePostDialogComponent,
    UpdatePostDialogComponent, 
  ],
  imports: [
    CommonModule,
    MenubarModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    RouterModule,
    Dialog,
    InputTextModule,
    ReactiveFormsModule
  ],
  exports: [
    TopNavBarComponent,
    CreatePostDialogComponent,
    UpdatePostDialogComponent
  ],
  providers: [DynamicDialogRef, DynamicDialogConfig]
})
export class SharedModule { }