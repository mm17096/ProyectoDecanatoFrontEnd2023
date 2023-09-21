import { Injectable } from '@angular/core';
import { ImagePosition, Workbook } from 'exceljs';
import { ConsultaService } from './consulta.service';
import { IConsultaExcelTabla, IConsultaExcelTablaC, IConsultaExcelTablaCompraDto, IConsultaExcelTablaDto, ITablaConsulta, ITablaConsultaC, ITablaConsultaCompraDto, ITablaConsultaDto } from '../../Interfaces/CompraVale/excel';
import * as fs from 'file-saver';
import { LOGO } from '../../Interfaces/logo';
import { Cantidad, Consulta, ValidarVale } from '../../Interfaces/CompraVale/Consulta';
import { Veri } from '../../Interfaces/CompraVale/Veri';
import { IExistenciaVales } from '../../Interfaces/existenciavales.interface';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  consulta:Consulta[]=[];
  fecha:Date;
  fechac:Date;
  cantvale:String;
  idcompra:string;
  precio:number;
  items:Veri[]=[];
  valor:ValidarVale[]=[];
  cantidad1:Cantidad[]=[];
  fechaActual: Date = new Date();
  private workbook!:Workbook
  constructor(private consultaService: ConsultaService) { }

dowloadExcel( 
  _existenciaI: IExistenciaVales,
  dataExcelConsulta: IConsultaExcelTablaDto,
  dataExcelCompra: IConsultaExcelTablaCompraDto,
  fechaDesde:Date, 
  fechaAsta:Date) {
  this.workbook = new Workbook(); 
  this.workbook.creator = 'ues.edu.sv';
// this.workbook.addWorksheet('CONSULTAS');
this.crearTablaConsulta(_existenciaI,dataExcelConsulta.tablaConsultaConsulta,dataExcelCompra.tablaConsultaCompra,fechaDesde,fechaAsta);
//this.crearTablaConsulta();
this.workbook.xlsx.writeBuffer().then((data) => {
const blob = new Blob([data]);
fs.saveAs(blob, 'consulta.xlsx');
});
}
private crearTablaConsulta(
  eexistenciaI: IExistenciaVales,
  dataConsultaTaTableConsulta: ITablaConsultaDto[],
  dataConsultaTaTableCompra: ITablaConsultaCompraDto[],
  fechaDesde:Date,
  fechaAsta:Date) {
 let sheet = this.workbook.addWorksheet('CONSULTAS');
  sheet.getColumn("A").width = 15;
  sheet.getColumn("B").width = 15;
  sheet.getColumn("C").width = 15;
  sheet.getColumn("D").width = 15;
  sheet.getColumn("E").width = 15;
  sheet.getColumn("F").width = 15;
  sheet.getColumn("G").width = 15;
  sheet.getColumn("H").width = 15;
  sheet.getColumn("I").width = 15;
  sheet.getColumn("J").width = 15;
  sheet.getColumn("K").width = 15;
  sheet.getColumn("L").width = 15;
  
sheet.columns.forEach((column) =>{
column.alignment = { vertical: 'middle', wrapText: true };
});
const logo = this.workbook.addImage({
  base64: LOGO,
  extension: 'png',
})
const position: ImagePosition ={
  tl:{col: 0.3,row: 1},
  ext:{width:60, height: 80},
}
 sheet.addImage(logo,position);
 sheet.mergeCells('B2', 'H2');
 sheet.mergeCells('B3', 'H3');
 sheet.mergeCells('B4', 'H4');
 sheet.mergeCells('A6', 'B6');
 sheet.mergeCells('A7', 'B7');
 sheet.mergeCells('C6', 'F6');
 sheet.mergeCells('C7', 'F7');
 const titulo = sheet.getCell('B2');
 const titulo1 = sheet.getCell('B3');
 const titulo2 = sheet.getCell('B4');
 titulo.value = 'UNIVERSIDAD DE EL SALVADOR';
 titulo1.value = 'FACULTAD MULTIDISCIPLINARIA PARACENTRAL';
 titulo2.value = 'INFORME MENSUAL CONSUMO DE COMBUSTIBLE';
 const titulo3 = sheet.getCell('A6');
 const titulo4 = sheet.getCell('A7');
 titulo3.value = 'LINEA DE TRABAJO:';
 titulo4.value = 'PERIODO:';

 const titulo5 = sheet.getCell('C6');
 titulo5.value = 'ENSEÑANZA MULTIDICIPLINARIA PARACENTRAL';
 const titulo6 = sheet.getCell('C7');
 titulo6.value = `${'Del ' + fechaDesde + ' Al ' + fechaAsta}`;
 const titulo7 = sheet.getCell('A11');
 sheet.mergeCells('A11', 'D11');
 titulo7.value = `${'Asignacion de Vales de combustible "'+fechaDesde+'"'}`;
 const titulo8 = sheet.getCell('A12');
 titulo8.value = `${'INICIO'}`;
 
 titulo7.style.font = { bold: true, size: 12,
  name: 'Antique Olive', 
  color: {
  argb: 'FF000000'
  }
  };

titulo.style.font = { bold: true, size: 12,
name: 'Antique Olive', 
color: {
argb: 'FF000000'
}
};
titulo.alignment ={
vertical: 'middle',
horizontal: 'center',
wrapText: false
}
titulo1.style.font = { bold: true, size: 12,
  name: 'Antique Olive', 
  color: {
  argb: 'FF000000'
  }
  };
  titulo1.alignment ={
  vertical: 'middle',
  horizontal: 'center',
  wrapText: false
  }
  titulo2.style.font = { bold: true, size: 12,
    name: 'Antique Olive',
    color: {
    argb: 'FF000000'
    }
    };
    titulo2.alignment ={
    vertical: 'middle',
    horizontal: 'center',
    wrapText: false
    }
    titulo3.style.font = { bold: true, size: 10,
      name: 'Antique Olive',
      color: {
      argb: 'FF000000'
      }
      };
      titulo4.style.font = { bold: true, size: 10,
        name: 'Antique Olive',
        color: {
        argb: 'FF000000'
        }
        };
        titulo5.style.font = { bold: true, size: 10,
          name: 'Antique Olive', underline: 'single',
          color: {
          argb: 'FF000000'
          }
          };
          titulo6.style.font = { bold: true, size: 10,
            name: 'Antique Olive', underline: 'single',
            color: {
            argb: 'FF000000'
            }
            };
      const headerR = sheet.getRow(10);
      headerR.values = [
        'N° de Vales/ F.',
        'Entradas Cant.',
        'Entradas P.U.',
        'Entradas Total',
        'Salidas Cant.',
        'Salidas P.U.',
        'Salidas  Total',
       /* 'Exist Cant.',
        'Exist   P.U.',
        'Exist  Total',*/
        'Fecha',
      ];
      const titulo00 = sheet.getCell('H'+`${11}`);
      titulo00.value = `${fechaDesde}`;
      titulo00.style.font = { bold: true, size: 12,
        name: 'Antique Olive', 
        color: {
        argb: 'FF000000'
        }
        };

      headerR.alignment = { vertical: 'middle', wrapText: false };
      ['A','B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((columnKey) => {
      sheet.getCell(`${columnKey}10`).font = {
      bold: true,
      color: {argb: 'FFFFFF' },
      size: 12,
      italic: true,
       };
      sheet.getCell(`${columnKey}10`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'FF0000FF' }, 
      bgColor: {argb: ''},
      };
      });

      headerR.alignment = { vertical: 'middle', wrapText: false };
      ['A','B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((columnKey) => {
      sheet.getCell(`${columnKey}11`).font = {
      bold: true,
      color: {argb: '000000' },
      size: 12,
      italic: true,
       };
      sheet.getCell(`${columnKey}11`).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: {argb: 'C7F6FF' }, 
      bgColor: {argb: ''},
      };
      });
      //-------------------------------------------
      let cell = 0;
      let conn = 1;
      let con = 0;
      let cell1 = 0;
      let conn1 = 1;
      let con1 = 0;
      let j = 0;
      let cant = 0;
      let salidadcant =0;
      let salidadpu =0;
      
     /* const titulo9 = sheet.getCell('I12');
      titulo9.value = `${j}`;*/

      const fileInsertar = sheet.getRows(13,dataConsultaTaTableConsulta.length+31)!;
      let index = 0;
      let row = fileInsertar[index];
      dataConsultaTaTableConsulta.forEach((item)=>{
        if(this.fecha === null){
          row = fileInsertar[index];
          //--------------------------------------
          
          //-------------------------------------
          row.values = [item.fecha,'','','','','','','','','',''];
          index++
        }else{
        if(item.fecha != this.fecha){
          row = fileInsertar[index];
          row.values = [item.fecha,'','','','','','','','','',''];
          index++
          cell1 = index;
          row = fileInsertar[index];
          cant = j-item.cantidadvale;
          this.cantidad1.push({cant:con1,veri:index,conta:1});
          salidadcant=salidadcant+item.cantidadvale;
          salidadpu=salidadpu+item.valor;
          row.values = [
            `${item.correlativo}`,
                `${''}`,
              `${'$'}`,
                `${'$'}`,
                  `${item.cantidadvale}`,
                    `${'$'+ item.valor}`,
                      `${'$'+(item.cantidadvale*item.valor)}`,
                      /*  `${''}`,
                          `${'$'+item.valor}`,
                            `${'$'+item.valor}`,*/
                               `${item.fecha}`
         ];
         con1=0;
         con =0;
         j=cant;
         index++ 
         this.cantvale = item.idasignacionvale;
         this.precio = item.valor;
        }else{
          if(con === 1 && item.valor === this.precio && item.idasignacionvale === this.cantvale){
             conn++;
             con1++;
            // console.log(conn)
             cell1 = 0;
          }
          row = fileInsertar[index];
        row.values = [
            `${item.correlativo}`,
            `${''}`,
             /* `${'$'}`,
                `${'$'}`,
                  `${''}`,
                    `${'$'}`,
                      `${'$'}`,
                        `${''}`,
                          `${'$'}`,
                            `${'$'}`,*/
/*`${item.cantidadvale}`,
                    `${'$'+ item.valor}`,
                      `${'$'+(item.cantidadvale*item.valor)}`,
                        `${''}`,
                          `${'$'+item.valor}`,
                            `${'$'+(item.cantidadvale*item.valor)}`,*/
                              //`${item.fecha}`
         ];
         index++
        if(item.idasignacionvale != this.cantvale){
          row.values = [
            `${item.correlativo}`,
             `${''}`,
              `${'$'}`,
                `${'$'}`,
                  `${item.cantidadvale}`,
                    `${'$'+ item.valor}`,
                      `${'$'+(item.cantidadvale*item.valor)}`,
                       /* `${''}`,
                          `${'$'+item.valor}`,
                            `${'$'+item.valor}`,*/
                               `${item.fecha}`
         ];
         this.cantvale = item.idasignacionvale;
         this.precio = item.valor;
         salidadcant=salidadcant+item.cantidadvale;
         salidadpu=salidadpu+item.valor;
        //index++
        }else if(item.valor != this.precio){
          con++;
          cell=index;
          this.valor.push({inde:index,cantidad:item.cantidadvale,valor:item.valor,valorAntes:this.precio});
          row.values = [
            `${item.correlativo}`,
             `${''}`,
              `${'$'}`,
                `${'$'}`,
                  `${item.cantidadvale}`,
                    `${'$'+ item.valor}`,
                      `${'$'+(item.cantidadvale*item.valor)}`,
                       /* `${''}`,
                          `${'$'+item.valor}`,
                            `${'$'+item.valor}`,*/
                               `${item.fecha}`
         ];
         this.precio = item.valor;
         salidadpu=salidadpu+item.valor;
        }
        }
        this.fecha = item.fecha;
      }
      });
      ['A','B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((columnKey) => {
        sheet.getCell(`${columnKey}${index+13}`).font = {
        bold: true,
        color: {argb: '000000' },
        size: 12,
        italic: true,
         };
        sheet.getCell(`${columnKey}${index+13}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: 'C7F6FF' }, 
        bgColor: {argb: ''},
        };
        });
        sheet.mergeCells('A'+`${index+13}`, 'E'+`${index+13}`);
        const titul1 = sheet.getCell('A'+`${index+13}`);
        titul1.value = `${'Compra de vales de combustible "'+fechaDesde+'"'}`;
        titul1.style.font = { bold: true, size: 12,
        name: 'Antique Olive', 
        color: {
        argb: 'FF000000'
        }
         };
    index = index + 1
    let cantcompra = 0;
    let cantcomprapu = 0;
    dataConsultaTaTableCompra.forEach((item)=>{
      //row = fileInsertar[index];
      if(this.fechac === null){
        row = fileInsertar[index];
        //--------------------------------------
        //-------------------------------------
        row.values = [item.fechacompra,'','','','','','','','','',''];
        index++
      }else{
        if(item.fechacompra != this.fechac){
          row = fileInsertar[index];
          row.values = [item.fechacompra,'','','','','','','','','',''];
          index++
          row = fileInsertar[index];
          row.values = [
            'DEl '+ `${item.codigoinicio}`+' AL '+`${item.codigofin}`,
             `${item.cantidad}`,
              `${'$'+ item.preciounitario}`,
                `${'$'+ item.cantidad*item.preciounitario}`,
                  `${''}`,
                    `${'$'}`,
                      `${'$'}`,
                       /* `${''}`,
                          `${'$'+item.valor}`,
                            `${'$'+item.valor}`,*/
                               `${item.fechacompra}`
         ];
         index++
         cantcompra = cantcompra + item.cantidad;
         cantcomprapu = cantcomprapu + item.preciounitario;
        }else{
      row.values = [
        'DEl '+ `${item.codigoinicio}`+' AL '+`${item.codigofin}`,
         `${item.cantidad}`,
          `${'$'+ item.preciounitario}`,
            `${'$'+ item.cantidad*item.preciounitario}`,
              `${''}`,
                `${'$'}`,
                  `${'$'}`,
                   /* `${''}`,
                      `${'$'+item.valor}`,
                        `${'$'+item.valor}`,*/
                           `${item.fechacompra}`
     ];
     index++
     cantcompra = cantcompra + item.cantidad;
     cantcomprapu = cantcomprapu + item.preciounitario;
      }
      this.fechac = item.fechacompra;
    }
    });
      //----------------------------------------------
      ['A','B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((columnKey) => {
        sheet.getCell(`${columnKey}${index+13}`).font = {
        bold: true,
        color: {argb: '000000' },
        size: 12,
        italic: true,
         };
        sheet.getCell(`${columnKey}${index+13}`).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: 'C7F6FF' }, 
        bgColor: {argb: ''},
        };
        });
      const titulo01 = sheet.getCell('A'+`${index+13}`);
      titulo01.value = `${'TOTAL'}`;
      titulo01.style.font = { bold: true, size: 12,
        name: 'Antique Olive', 
        color: {
        argb: 'FF000000'
        }
        };
        const titulo021 = sheet.getCell('B'+`${index+13}`);
      titulo021.value = `${cantcompra}`;
      titulo021.style.font = { bold: true, size: 12,
        name: 'Antique Olive', 
        color: {
        argb: 'FF000000'
        }
        };
       /* const titulo022 = sheet.getCell('C'+`${index+13}`);
      titulo022.value = `${cantcomprapu}`;
      titulo022.style.font = { bold: true, size: 12,
        name: 'Antique Olive', 
        color: {
        argb: 'FF000000'
        }
        };*/
        const titulo023 = sheet.getCell('D'+`${index+13}`);
      titulo023.value = `${cantcompra*cantcomprapu}`;
      titulo023.style.font = { bold: true, size: 12,
        name: 'Antique Olive', 
        color: {
        argb: 'FF000000'
        }
        };
      const titulo02 = sheet.getCell('E'+`${index+13}`);
      titulo02.value = `${salidadcant}`;
      titulo02.style.font = { bold: true, size: 12,
        name: 'Antique Olive', 
        color: {
        argb: 'FF000000'
        }
        };
        const titulo03 = sheet.getCell('G'+`${index+13}`);
        titulo03.value = `${salidadcant*salidadpu}`;
        titulo03.style.font = { bold: true, size: 12,
          name: 'Antique Olive', 
          color: {
          argb: 'FF000000'
          }
          };
          const titulo04 = sheet.getCell('H'+`${index+13}`);
        titulo04.value = `${fechaAsta}`;
        titulo04.style.font = { bold: true, size: 12,
          name: 'Antique Olive', 
          color: {
          argb: 'FF000000'
          }
          };
        /*  sheet.mergeCells('A'+`${index+15}`, 'E'+`${index+15}`);
          ['A','B', 'C', 'D'].forEach((columnKey) => {
            sheet.getCell(`${columnKey}${index+15}`).font = {
            bold: true,
            color: {argb: '000000' },
            size: 12,
            italic: true,
             };
            sheet.getCell(`${columnKey}${index+15}`).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'C7F6FF' }, 
            bgColor: {argb: ''},
            };
            });*/
           /* ['A','B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach((columnKey) => {
              sheet.getCell(`${columnKey}${index+15}`).font = {
              bold: true,
              color: {argb: '000000' },
              size: 12,
              italic: true,
               };
              sheet.getCell(`${columnKey}${index+15}`).fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: {argb: 'C7F6FF' }, 
              bgColor: {argb: ''},
              };
              });*/
             
           // this.fechaActual = new Date();
           sheet.mergeCells('A'+`${index+15}`, 'E'+`${index+15}`);
           ['A','B', 'C', 'D'].forEach((columnKey) => {
             sheet.getCell(`${columnKey}${index+15}`).font = {
             bold: true,
             color: {argb: '000000' },
             size: 12,
             italic: true,
              };
             sheet.getCell(`${columnKey}${index+15}`).fill = {
             type: 'pattern',
             pattern: 'solid',
             fgColor: {argb: 'C7F6FF' }, 
             bgColor: {argb: ''},
             };
             });
          const titulo05 = sheet.getCell('A'+`${index+15}`);
        titulo05.value = 'Vales disponibles a la fecha: "'+`${this.formatoFecha(this.fechaActual)}`+'" = '+`${eexistenciaI.valesDisponibles}`;
        titulo05.style.font = { bold: true, size: 12,
          name: 'Antique Olive', 
          color: {
          argb: 'FF000000'
          }
          };
      console.log('Es'+`${this.valor.length}`)
      //-------------------------------------------
      for(let i=0; i<this.valor.length; i++){
      const titulo10 = sheet.getCell('E'+`${this.valor[i].inde+12}`);
      titulo10.value = `${this.cantidad1[i].cant}`;
     /* const titulo11 = sheet.getCell('E'+`${(this.valor[i].inde+12)-this.cantidad1[i].cant}`);
      titulo11.value = `${(this.valor[i].cantidad-this.cantidad1[i].cant)}`;
      console.log(this.valor);*/
      }
      
     /* let j = 0;
      let cant = 0;
      let jj =0;
      dataConsultaTaTable.forEach((item)=>{
        jj++
        if(item.fechacompra <= fechaDesde && item.idcompra != this.idcompra){
        
            j += item.cantidad;
            this.precio = item.precio;
            this.items = [{cantidad:j,preciou:item.precio}];

       }
        this.idcompra = item.idcompra;
      });
      const titulo9 = sheet.getCell('H12');
      titulo9.value = `${j}`;
      const fileInsertar = sheet.getRows(13,jj+31)!;
      let index = 0;
      let row = fileInsertar[index];
      dataConsultaTaTable.forEach((item)=>{ 
        
        if(item.fecha >= fechaDesde && item.fecha <= fechaAsta){
        if(item.fecha != this.fecha){
          

          row = fileInsertar[index];
          row.values = [item.fecha,'','','','','','','','',''];
          index++
          row = fileInsertar[index];
          cant = j-item.ExistCant;
          row.values = [
            `${item.codigoVale}`,
                `${''}`,
              `${'$'}`,
                `${'$'}`,
                  `${item.solidasCant}`,
                    `${'$'+ item.salidasPU}`,
                      `${'$'+(item.solidasCant*item.salidasPU)}`,
                        `${cant}`,
                          `${'$'+item.ExistPU}`,
                            `${'$'+(cant*item.ExistPU)}`,
                             // `${item.fecha}`
         ];
         j=cant;
         index++      
        }else {
        row = fileInsertar[index];
        row.values = [
            `${item.codigoVale}`,
            `${item.entradasCant}`,
              `${'$'+ item.entradasPU}`,
                `${'$'+ (item.entradasCant*item.entradasPU)}`,
                  `${item.solidasCant}`,
                    `${'$'+ item.salidasPU}`,
                      `${'$'+(item.solidasCant*item.salidasPU)}`,
                        `${item.ExistCant}`,
                          `${'$'+item.ExistPU}`,
                            `${'$'+(item.ExistCant*item.ExistPU)}`,
                              `${item.fecha}`
         ];
         index++
        this.cantvale = item.solidasCant;
        }
         this.fecha = item.fecha;
      }
      });*/
    

      
      
  }
  formatoFecha(fecha: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };

    return fecha.toLocaleDateString(undefined, options);
  }
}
