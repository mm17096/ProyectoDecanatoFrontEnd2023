import { Component, OnInit, ViewChild } from '@angular/core';
import { emailSentBarChart, monthlyEarningChart } from './data';
import { ChartType } from './dashboard.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../../core/services/event.service';

import { ConfigService } from '../../../core/services/config.service';
import { UsuarioService } from 'src/app/account/auth/services/usuario.service';
import { IEmpleado } from 'src/app/modules/empleado/interface/empleado.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceService } from 'src/app/modules/solicitudes/Service/service.service';
import { IExistenciaVales } from 'src/app/modules/solicitudes/Interfaces/existenciavales.interface';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isVisible: string;

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;

  isActive: string;

  empleado!: IEmpleado;
  fotoEmpleado!: string;
  usuario!: string;
  imagenBlob: Blob | null = null;
  imagenURL: any; // Variable para almacenar la URL de la imagen
  existenciaI!: IExistenciaVales; //para vales disponibles


  @ViewChild('content') content;
  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private eventService: EventService,
    private usuarioService: UsuarioService,
    private jwtHelper: JwtHelperService,
    private existenciaService: ServiceService,
    ) {}

  ngOnInit() {
    //console.log(this.usuarioService.getUsuario());
    this.fotoEmpleado =  this.usuarioService.empleadofoto;
    this.obtnerExistenciaVales();
    /**
     * horizontal-vertical layput set
     */
     const attribute = document.body.getAttribute('data-layout');

     this.isVisible = attribute;
     const vertical = document.getElementById('layout-vertical');
     if (vertical != null) {
       vertical.setAttribute('checked', 'true');
     }
     if (attribute == 'horizontal') {
       const horizontal = document.getElementById('layout-horizontal');
       if (horizontal != null) {
         horizontal.setAttribute('checked', 'true');
       }
     }

    /**
     * Fetches the data
     */
    this.fetchData();
  }

/*   decodeToken() {
    const token = this.usuarioService.token;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.sub;
  } */

  //// metodo para obtener el empleado /////
/*   getEmpleadoData(nombre: string) {
    this.eventService.getEmpleado(nombre)
      .subscribe(
        (data: IEmpleado) => {
          this.empleado = data; // Asigna el resultado a la variable empleado
        },
        (error) => {
          console.error('Error al obtener datos del empleado', error);
        }
      );
  } */

  ngAfterViewInit() {
    /* setTimeout(() => {
      this.openModal();
    }, 2000); */
  }

  /* Metodos para optener datos de cards */
  
  //Obtitne la existencia de los vales
  obtnerExistenciaVales() {
    this.existenciaService.getCantidadVales().subscribe({
      next: (response) => {
        this.existenciaI = response;
      },
    });
  }

  /* Metodos para optener datos de cards */
  
  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
         data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }


  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
   changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }
}
