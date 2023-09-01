import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDocumentosvale } from '../../interface/IDocumentosvale';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulodocumentovale',
  templateUrl: './modulodocumentovale.component.html',
  styleUrls: ['./modulodocumentovale.component.scss']
})
export class ModulodocumentovaleComponent implements OnInit {
  @Input() leyenda!: string;
  @Input() leyendas!: string;
  @Input() titulo!: string;
  formBuilder!: FormGroup;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formBuilder=this.Iniciarformulario();
  }
  openModal(content: any) {
    this.modalService.open(content, { size: '', centered: true });
  }

  guardar(){

  }

  esCampoValido(campo: string){
    const validarCampo= this.formBuilder.get(campo);
    return !validarCampo?.valid && validarCampo?.touched ? 'is-invalid' : validarCampo?.touched? 'is-valid': '';
  
  }

  private Iniciarformulario(): FormGroup {1
    return this.fb.group({
      tipo: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      comprobante: ['', [Validators.required]],
      solicitud: ['', [Validators.required]],
      file: ['', [Validators.required]],
  
    });
  }

}
