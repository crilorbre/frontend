import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/users.service";
import { User } from "../../../models/User";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { confirmPasswordValidator } from "../../../validators/confirm-password-validator";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = {};

  form = new FormGroup({
    oldPassword: new FormControl(''),
    password: new FormControl('', Validators.pattern('(?=^.{8,16}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')),
    confirmPassword: new FormControl('')
  }, {validators: confirmPasswordValidator})

  constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
    this.userService.profile().subscribe(
      res => this.user = res,
      erro => console.log(erro)
    )
  }

  onSubmit(){

    this.user.password = this.form.get('password').value;

    this.userService.updateUser(this.user).subscribe(
      res => {
        this.toastrService.success('Profile updated successfully')
      },
      error => console.log(error)
    )
  }

}
