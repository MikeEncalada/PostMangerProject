import { Component, computed, OnInit, Signal } from '@angular/core';
import { User, UserForAdmin } from '../../../../core/config/interfaces/user.interface';
import { AdminRepository } from '../../../../core/config/model/admin.repository';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  allUsers: Signal<UserForAdmin[]>;

  constructor(private adminRepository: AdminRepository) {
    this.allUsers = computed(() => {
      return this.adminRepository.allUsers();
    });

  }
  ngOnInit(): void {
    this.adminRepository.reset();
  }
}
