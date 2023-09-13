import { Injectable } from '@angular/core';
import { ImagePosition, Workbook } from 'exceljs';
import { ConsultaService } from './consulta.service';
import { IConsultaExcelTabla, ITablaConsulta } from '../../Interfaces/CompraVale/excel';
import * as fs from 'file-saver';
import { LOGO } from '../../Interfaces/logo';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private workbook!:Workbook
  constructor(private consultaService: ConsultaService) { }

dowloadExcel() {
  this.workbook = new Workbook(); 
  this.workbook.creator = 'ues.edu.sv';
//this.workbook.addWorksheet('CONSULTAS');
//this.crearTablaConsulta(dataExcel.tablaConsulta);
this.crearTablaConsulta();
this.workbook.xlsx.writeBuffer().then((data) => {
const blob = new Blob([data]);
fs (blob, 'consulta.xlsx');
});
}
private crearTablaConsulta() {
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
 sheet.mergeCells('B2', 'F2');
 sheet.mergeCells('B3', 'F3');
 sheet.mergeCells('B4', 'F4');
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
      
    
    /*  const fileInsertar = sheet.getRows(11,dataConsultaTaTable.length)!;
      for(let index = 0; index < fileInsertar.length; index++){
        const itemData = dataConsultaTaTable[index];
        const row = fileInsertar[index];
       // const codigoVale = itemData.codigoVale1;
      //  console.log(itemData)
        row.values = [
         // itemData.codigoVale,
           //`${itemData.codigoVale.toString}`,
        ];
  }*/

      
      
  }
}
