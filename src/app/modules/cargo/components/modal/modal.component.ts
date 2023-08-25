import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICargo } from '../../interface/cargo';
import { CargoService } from '../../service/cargoservice';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  formCargo !: FormGroup;
  @Input() cargos !: ICargo;
  @Input() leyenda !: string;



  constructor(private cargoService : CargoService,
    private fb : FormBuilder,
    private router : Router,
    private modalService: NgbModal  ) {
      this.formCargo = this.iniciarFormulario();
     }

     private iniciarFormulario(){
      return this.fb.group({
        nombreCargo : ['',Validators.compose([Validators.required, Validators.pattern('[A-Z]*')])],
        descripcion : ['',Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],

      })
    }

    guardar(){

    if(this.formCargo.valid){
      if(this.cargos != null){
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
    const data : ICargo =
      {
        nombreCargo : this.formCargo.controls['nombreCargo'].value,
        descripcion : this.formCargo.controls['descripcion'].value,
        estado : 8
      }
    ;

    console.log(data);
    console.log(this.formCargo.value);

    this.cargoService.saveCargos(data).subscribe({
      next : (resp) => {
        this.modalService.dismissAll();
        this.formCargo.reset();
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

      const data : ICargo =
      {
        codigoCargo : this.cargos.codigoCargo,
        nombreCargo : this.formCargo.controls['nombreCargo'].value,
        descripcion : this.formCargo.controls['descripcion'].value,
        estado : 8
      }
    ;


    this.cargoService.editCargo(data).subscribe({
      next : (resp) => {
        this.formCargo.reset();
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

  ngOnInit(): void {
    if(typeof this.cargos != 'undefined'){
      this.formCargo.patchValue(this.cargos);
    }
  }

  esCampoValido(campo:string){
    const validarCampo = this.formCargo.get(campo);
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

  get nombreCargo(){
    return this.formCargo.get('nombreCargo');
  }

  get descripcion(){
    return this.formCargo.get('descripcion');
  }
  }
