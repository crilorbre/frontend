import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../services/users.service";
import { User } from "../../../models/User";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { confirmPasswordValidator } from "../../../validators/confirm-password-validator";
import { uniqueEmailValidator } from "../../../validators/unique-email-validator";
import { uniqueUsernameValidator } from "../../../validators/unique-username-validator";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  user: User = {};

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('^[A-z0-9]*$'), Validators.minLength(5)], uniqueUsernameValidator(this.userService)),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=^.{8,16}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$')]),
    confirmPassword: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email], uniqueEmailValidator(this.userService)),
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[A-zñÑáéíóúÁÉÍÓÚ\s]+$'), Validators.maxLength(100)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[A-zñÑáéíóúÁÉÍÓÚ\s]+$'), Validators.maxLength(100)])
  }, {validators: confirmPasswordValidator})

  constructor(private userService: UserService, private router: Router, private toastrService: ToastrService) { }

  ngOnInit() {
  }

  saveNewUser(){
    this.userService.signUp(this.user).subscribe(
      res => {
        console.log(res),
        this.router.navigate(['/'])
        this.toastrService.success('User registration successful')
      },
      err => console.log(err)
    )
  }

  onSubmit(){
    this.user.username = this.form.get('username').value
    this.user.password = this.form.get('password').value
    this.user.email = this.form.get('email').value
    this.user.firstName = this.form.get('firstName').value
    this.user.lastName =this.form.get('lastName').value

    this.saveNewUser()
  }


}
