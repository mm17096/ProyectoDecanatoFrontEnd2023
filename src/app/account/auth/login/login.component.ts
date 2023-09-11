import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { ILoginUsuario } from '../interfaces/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  storage: Storage = window.localStorage;
  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  public showPassword: boolean = false;
  public password: string = '';

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder, 
    private usuarioService: UsuarioService, 
    private router: Router) { }

  ngOnInit() {
    this.usuarioService.logout();
    this.loginForm = this.formBuilder.group({
      email: ['kevin6', [Validators.required]],
      password: ['1234', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {

    if (this.loginForm.valid) {

      const login: ILoginUsuario = {
        nombre: this.loginForm.get('email').value,
        clave: this.loginForm.get('password').value
      }
      
      this.usuarioService.login(login).subscribe(
        (resp) => {
          if (this.loginForm.get('remember')?.value) {
            this.storage.setItem('email', this.loginForm.get('email')?.value);
          } else {
            this.storage.removeItem('email');
          }

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });
          
          Toast.fire({
            icon: 'success',
            text: '¡Ha iniciado sesión!'
          }).then(() => {
            // Aquí se realiza la redirección
            this.router.navigate(['/dashboard']);
            this.loginForm.reset();
          });
          
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err,
          });
        }
      );
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
