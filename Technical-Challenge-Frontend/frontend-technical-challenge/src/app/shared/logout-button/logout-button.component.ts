import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout-button',
  standalone: false,
  templateUrl: './logout-button.component.html',
  styleUrl: './logout-button.component.scss'
})
export class LogoutButtonComponent {
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit(); 
  }
}
