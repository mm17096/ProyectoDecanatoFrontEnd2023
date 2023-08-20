import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() leyenda!: string;
  @Input() titulo!: string;

  formularioSoliVe!: FormGroup;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.iniciarFormulario();
  }

  iniciarFormulario(){
    this.formularioSoliVe = this.fb.group({
      fechaSolicitud: ['', [Validators.required]],
      fechaSalida: ['', [Validators.required]],
    });
  }
  openModal(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }
}
