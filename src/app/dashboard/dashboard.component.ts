import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.accessUser();
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  accessUser() {
    this.userService.getProfile().subscribe((data: any) => {
      this.user = data;
      console.log(this.user);
      console.log(this.user.role);
      // this.accessUser();
    },
      (err: HttpErrorResponse) => {
        console.log(err);
      });

  }

}
