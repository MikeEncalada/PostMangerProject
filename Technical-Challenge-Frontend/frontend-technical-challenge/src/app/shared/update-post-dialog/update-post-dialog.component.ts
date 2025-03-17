import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyPost, UpdatePost } from '../../core/config/interfaces/post.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-update-post-dialog',
  standalone: false,
  templateUrl: './update-post-dialog.component.html',
  styleUrl: './update-post-dialog.component.scss'
})
export class UpdatePostDialogComponent {



  updatePostForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef, 
    public config: DynamicDialogConfig 
  ) {

    const postToUpdate = this.config.data as UpdatePost;

    this.updatePostForm = new FormGroup({
      id: new FormControl(postToUpdate?.id), 
      title: new FormControl(postToUpdate?.title, [Validators.required, Validators.minLength(5)]),
      content: new FormControl(postToUpdate?.content, [Validators.required, Validators.minLength(5)])
    });
    
  }

  onSubmit(): void {
    if (this.updatePostForm.valid) {
      const updatedPost = this.updatePostForm.value as UpdatePost;
      this.ref.close(updatedPost); // Cierra el diálogo y devuelve el post actualizado
    }
  }

  onClose(): void {
    this.ref.close(); // Cierra el diálogo sin guardar cambios
  }


}
