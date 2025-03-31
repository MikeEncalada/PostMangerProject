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
            icon: 'home',
            link: '',
            allowedRoles: ['ADMIN', 'USER', 'NONE'],
            exact: true
          },
          {
            label: 'My Posts',
            icon: 'myposts',
            link: '/user/my-posts',
            allowedRoles: ['ADMIN', 'USER'],
            exact: false
          },
          { 
            label: 'Posts',
            icon: 'allposts',
            link: '/admin/posts',
            allowedRoles: ['ADMIN'],
            exact: false
          },
          {
            label: 'Users',
            icon: 'users',
            link: '/admin/users',
            allowedRoles: ['ADMIN'],
            exact: false
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
