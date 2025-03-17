import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatePost } from '../../core/config/interfaces/post.interface';

@Component({
  selector: 'app-create-post-dialog',
  standalone: false,
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.scss'
})
export class CreatePostDialogComponent {
  @Input() visible: boolean = false; 
  @Output() visibleChange = new EventEmitter<boolean>(); 
  @Output() createPost = new EventEmitter<CreatePost>();

  createPostForm: FormGroup;

  constructor() {

    this.createPostForm= new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(15)]),
      content: new FormControl('', [Validators.required, Validators.minLength(15)]),
    });
    
  }

  onClose(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible); 
  }

  onHide(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible); 
  }

  onSubmit(): void {
    this.createPost.emit(this.createPostForm.value); 
    this.onClose(); 
  }
}
