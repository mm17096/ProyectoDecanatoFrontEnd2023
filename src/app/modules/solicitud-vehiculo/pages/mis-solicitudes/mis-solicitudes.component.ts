import { Component, OnInit } from '@angular/core';
import {SolicitudVehiculoService} from "../../services/solicitud-vehiculo.service";
import {ModalComponent} from "../../components/modal/modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { IEstados } from '../../interfaces/data.interface';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.scss']
})
export class MisSolicitudesComponent implements OnInit {

  // migas de pan
  breadCrumbItems: Array<{}>;
  term: any; // para buscar
  p: any; // paginacion

  page:number = 0;
  size:number = 10;

  estadoSeleccionado: any;
  estadosSoliVe: IEstados [] = [];

  constructor( private soliVeService: SolicitudVehiculoService, private modalService: NgbModal,
               private userService: UsuarioService) { }

  ngOnInit(): void {
    this.userService.getUsuario();
    this.breadCrumbItems = [{ label: 'Solicitud de Vehículo' }, { label: 'Mis Solicitudes', active: true }]; // miga de pan
    this.soliVeService.getSolicitudesVehiculo(this.estadoSeleccionado);
    this.getEstados();
  }

  abrirModal(leyenda: string) {
    const modalRef = this.modalService.open(ModalComponent, {size: 'xl', backdrop: 'static'});
    modalRef.componentInstance.leyenda = leyenda;
    modalRef.componentInstance.estadoSeleccionado = this.estadoSeleccionado;
    modalRef.componentInstance.usuarioActivo = this.usuarioActivo;
  }

  get usuarioActivo(){
    return this.userService.usuario;
  }

  get listSoliVeData(){
    return this.soliVeService.listSoliVehiculo;
  }

  onEstadoSeleccionado(event: any) {
    this.estadoSeleccionado = event.target.value;
    if (this.estadoSeleccionado == 0) {
      this.soliVeService.getSolicitudesVehiculo(null);
    } else {
      this.soliVeService.getSolicitudesVehiculo(this.estadoSeleccionado);
    }
  }


  getEstados() {
    this.soliVeService.obtenerEstados().subscribe((resp) => {
      this.estadosSoliVe = resp;
    });
  }

}
