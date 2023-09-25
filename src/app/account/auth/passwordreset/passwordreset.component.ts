import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {

  resetForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.pattern['']]],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    if (this.resetForm.valid) {
       const nombre = this.resetForm.get('correo').value;
       const dui = this.resetForm.get('dui').value;
      
      this.usuarioService.resetpass(nombre, dui).subscribe(
        (resp) => {

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
          })

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
}
