import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepto } from '../../interface/depto';
import { DeptoService } from '../../service/depto.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  formDepto !: FormGroup;
  @Input() deptos !: IDepto;
  @Input() leyenda !: string;

  constructor(private deptopService : DeptoService,
    private fb : FormBuilder,
    private router : Router,
    private modalService: NgbModal) {
      this.formDepto = this.iniciarFormulario();
    }

  ngOnInit(): void {
    if(typeof this.deptos != 'undefined'){
      this.formDepto.patchValue(this.deptos);
    }
  }

  private iniciarFormulario(){
    return this.fb.group({
      nombre : ['',Validators.compose([Validators.required, Validators.pattern('[A-Z]*')])],

    })
  }

  guardar(){

    if(this.formDepto.valid){
      if(this.deptos != null){
        this.editando();
      console.log("editando");
      } else {
        console.log("registrando");
        this.registrando();
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios o invalidos',
        text: `Ocurrio un error`,

      });
    }
    }

    registrando(){
      const data : IDepto =
        {
          nombre : this.formDepto.controls['nombre'].value,
          estado : 8
        }
      ;

      console.log(data);
      console.log(this.formDepto.value);

      this.deptopService.saveDepto(data).subscribe({
        next : (resp) => {
          this.modalService.dismissAll();
          this.formDepto.reset();
          this.mostrar();
        },
        error : (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Ocurrio un error`,

          });
          console.log(error);
        },
        complete : () => {
          Swal.fire({
            position: 'center',
            title: 'Buen Trabajo',
            text: `Datos Guardados con exito`,
            icon: 'info',
          });
        }
      });
      }

      editando(){

        const data : IDepto =
        {
          codigoDepto : this.deptos.codigoDepto,
          nombre : this.formDepto.controls['nombre'].value,

          estado : 8
        }
      ;


      this.deptopService.editDepto(data).subscribe({
        next : (resp) => {
          this.formDepto.reset();
          this.modalService.dismissAll();
          this.mostrar();
        },
        error : (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `Ocurrio un error`,

          });
          console.log(error);
        },
        complete : () => {
          Swal.fire({
            position: 'center',
            title: 'Buen Trabajo',
            text: `Datos Guardados con exito`,
            icon: 'info',
          });
        }
      });
      }

      esCampoValido(campo:string){
        const validarCampo = this.formDepto.get(campo);
        return !validarCampo?.valid && validarCampo?.touched
        ? 'is-invalid' : validarCampo?.touched ? 'is-valid' : '';
      }

      mostrar(){
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);

      }

      openModal(content: any) {
        this.modalService.open(content);
      }

      get nombre(){
        return this.formDepto.get('nombre');
      }
}
