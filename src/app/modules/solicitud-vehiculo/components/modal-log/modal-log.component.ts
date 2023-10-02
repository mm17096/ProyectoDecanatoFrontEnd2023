import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-log',
  templateUrl: './modal-log.component.html',
  styleUrls: ['./modal-log.component.scss']
})
export class ModalLogComponent implements OnInit {

  alerts = [
    {
      id: 1,
      type: "info",
      message:
        "Estos son los diferentes moviemientos que ha tenido la solicitud.",
      show: false,
    },
  ];

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  siMuestraAlertas() {
    return this.alerts.every((alert) => alert.show);
  }
  restaurarAlerts() {
    this.alerts.forEach((alert) => {
      alert.show = true;
    });
  }
  CambiarAlert(alert) {
    alert.show = !alert.show;
  }

}
