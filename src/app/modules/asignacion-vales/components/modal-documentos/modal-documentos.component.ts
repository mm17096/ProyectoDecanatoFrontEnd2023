import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDocumentosvale, valeDocumentosI } from '../../interface/IDocumentosvale';
import Swal from 'sweetalert2';
import { DetalleService } from '../../services/detalle.service';
import { MensajesService } from 'src/app/shared/global/mensajes.service';

@Component({
  selector: 'app-modal-documentos',
  templateUrl: './modal-documentos.component.html',
  styleUrls: ['./modal-documentos.component.scss']
})
export class ModalDocumentosComponent implements OnInit {
  @Input() leyenda!: string;
  @Input() titulo!: string;
  formBuilder!: FormGroup;
  @Input() documentovaleOd!: IDocumentosvale;
  imagen: string = 'no hay';
  private file!: File;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router, private detalleservice: DetalleService , private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.formBuilder=this.Iniciarformulario();
    
  }

  guardar(){
    if (this.formBuilder.valid) {
      if (this.documentovaleOd != null) {
        //this.editando();
      } else {
        console.log("antes de registrar");
       this.registrando();
      }
    } else {
      Swal.fire({
        position: 'center',
        title: 'Faltan datos en el formuario',
        text: 'formulario no valido',
        icon: 'warning',
      });
    }
    
  }
  registrando(){
    //obtiene los valores del formulario
    const listando = this.formBuilder.value;
      //const entsali: valeDocumentosI = new valeDocumentosI(listando.tipo,listando.foto,listando.url,listando.comprobante, listando.fecha);
     console.log(listando);
  
     this.detalleservice.NuevosDatos(listando, this.file).subscribe((resp: any) => {
      if (resp) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          //timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        Toast.fire({
          icon: 'success',
          text: 'Almacenamiento exitoso'
        });
  //reinicia el formulario
        this.formBuilder.reset();
        this.recargar();
        this.modalService.dismissAll();
      }
    }, (err: any) => {
      this.mensajesService.mensajesSweet(
        "error",
        "Ups... Algo salió mal",
        err
      )
    });
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = (target.files as FileList)[0];
   //this.imagen = 'seleccioanda';
    //this.preVisualizarImagen(event);
  }

  recargar(){
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
  openModal(content: any) {
    this.modalService.open(content, { size: 'sm', centered: true });
  }

  esCampoValido(campo: string){
    const validarCampo= this.formBuilder.get(campo);
    return !validarCampo?.valid && validarCampo?.touched ? 'is-invalid' : validarCampo?.touched? 'is-valid': '';
  
  }
  private Iniciarformulario(): FormGroup {
    return this.fb.group({
      id:[''],
      tipo: ['', [Validators.required]],
      fecha: ['', [Validators.required,this.maxDateValidator() ]],
      comprobante: ['', [Validators.required]],
      foto: [''],
      url: [''],
      solicitudvale:['', [Validators.required]]
  
    });
  }


  //funcion para obtener la fecha actual.
  getToday(): Date{
    return new Date();
  }
  // Validador personalizado para la fecha
  maxDateValidator() {
    return (control) => {
      const selectedDate = new Date(control.value);
      const today = this.getToday();

      if (selectedDate > today) {
        return { maxDate: true };
      }

      return null;
    };
  }

  get Listamisiones() {
    return this.detalleservice.listDeMisiones;
  }


}
