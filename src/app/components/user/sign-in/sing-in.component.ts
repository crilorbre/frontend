import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/users.service";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.css']
})
export class SingInComponent implements OnInit {

  user: User = {};

  errorMessage: String = null;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  signIn(){
    this.user.username = this.form.get('username').value;
    this.user.password = this.form.get('password').value;

    this.userService.signIn(this.user).subscribe(
      res => {
        this.router.navigate(['/'])
      },
      err => {console.log(err);
        this.errorMessage = "Incorrect username or password!";}
    )
    
  }

}
