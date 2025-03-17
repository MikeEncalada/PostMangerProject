import { Component, OnInit } from '@angular/core';
import { CustomMenuItem } from '../../core/config/utils/custom-menu-item.interface';
import { AuthService } from '../../core/config/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-top-nav-bar',
  standalone: false,
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.scss'
})
export class TopNavBarComponent implements OnInit{

  items: CustomMenuItem[] | undefined;
  isLoggedIn: boolean;
  filteredItems: CustomMenuItem[] | undefined;


  constructor(private auth: AuthService, private router: Router) {
    this.isLoggedIn = this.auth.authenticated;
  }

  ngOnInit() {
      this.items = [
          { 
            label: 'Home',
            icon: 'pi pi-home',
            link: '',
            allowedRoles: ['ADMIN', 'USER', 'NONE'],
          },
          {
            label: 'My Posts',
            icon: 'pi pi-home',
            link: '/user/my-posts',
            allowedRoles: ['ADMIN', 'USER'],
          },
          { 
            label: 'Posts',
            icon: 'pi pi-search',
            link: '/admin/posts',
            allowedRoles: ['ADMIN'],
          },
          {
            label: 'Users',
            icon: 'pi pi-search',
            link: '/admin/users',
            allowedRoles: ['ADMIN'],
          },
          
      ];
      this.filteredItems = this.items.filter((item) => 
        item.allowedRoles.includes(this.auth.userRole)
      );
  }

  logout(){
    this.auth.clear();
    this.router.navigateByUrl("/auth/login");
  }

}
