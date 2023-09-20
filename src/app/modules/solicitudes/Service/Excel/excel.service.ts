import { Injectable } from '@angular/core';
import { ImagePosition, Workbook } from 'exceljs';
import { ConsultaService } from './consulta.service';
import { IConsultaExcelTabla, IConsultaExcelTablaC, IConsultaExcelTablaCompraDto, IConsultaExcelTablaDto, ITablaConsulta, ITablaConsultaC, ITablaConsultaCompraDto, ITablaConsultaDto } from '../../Interfaces/CompraVale/excel';
import * as fs from 'file-saver';
import { LOGO } from '../../Interfaces/logo';
import { Consulta } from '../../Interfaces/CompraVale/Consulta';
import { Veri } from '../../Interfaces/CompraVale/Veri';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  consulta:Consulta[]=[];
  fecha:Date;
  cantvale:number;
  idcompra:string;
  precio:number;
  items:Veri[]=[];
  private workbook!:Workbook
  constructor(private consultaService: ConsultaService) { }

dowloadExcel(dataExcel: IConsultaExcelTabla, 
  dataExcelC: IConsultaExcelTablaC,
  dataExcelConsulta: IConsultaExcelTablaDto,
  dataExcelCompra: IConsultaExcelTablaCompraDto,
  fechaDesde:Date, 
  fechaAsta:Date) {
  this.workbook = new Workbook(); 
  this.workbook.creator = 'ues.edu.sv';
// this.workbook.addWorksheet('CONSULTAS');
this.crearTablaConsulta(dataExcel.tablaConsulta,dataExcelC.tablaConsultaC,dataExcelConsulta.tablaConsultaConsulta,dataExcelCompra.tablaConsultaCompra,fechaDesde,fechaAsta);
//this.crearTablaConsulta();
this.workbook.xlsx.writeBuffer().then((data) => {
const blob = new Blob([data]);
fs.saveAs(blob, 'consulta.xlsx');
});
}
private crearTablaConsulta(dataConsultaTaTable: ITablaConsulta[],
  dataConsultaTaTableC: ITablaConsultaC[],
  dataConsultaTaTableConsulta: ITablaConsultaDto[],
  dataConsultaTaTableCompra: ITablaConsultaCompraDto[],
  fechaDesde:Date,
  fechaAsta:Date) {
  const sheet = this.workbook.addWorksheet('CONSULTAS');
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
 sheet.mergeCells('B2', 'I2');
 sheet.mergeCells('B3', 'I3');
 sheet.mergeCells('B4', 'I4');
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
 titulo7.value = `${fechaDesde}`;
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
        'Exist Cant.',
        'Exist   P.U.',
        'Exist  Total',
      ];


      headerR.alignment = { vertical: 'middle', wrapText: false };
      ['A','B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J'].forEach((columnKey) => {
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
      ['A','B', 'C', 'D', 'E', 'F', 'G', 'H','I', 'J'].forEach((columnKey) => {
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
      
      let j = 0;
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
          dataConsultaTaTableC.forEach((itemC)=>{
  
          });

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
      });
    

      
      
  }
}
