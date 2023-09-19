import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IDocumentosvale } from '../interface/IDocumentosvale';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url: string= environment.baseUrl;

  constructor(private http: HttpClient) { }

  multiple(myFiles: File[]){
    const formData= new FormData();
    myFiles.forEach(archivo=>{
      formData.append('file', archivo);
    });
    return this.http.post<IDocumentosvale[]>(`${this.url}`, formData).pipe(
      catchError((err: HttpErrorResponse)=>{
        return this.errorHandler(err)
      })
    );
  }

  errorHandler(error: HttpErrorResponse):Observable<never>{
    if(error.status ===500)
    return throwError(()=> new Error(error.statusText))
  if(error.status===400)
  return throwError(()=> new Error('Algo pasó'));
return throwError(()=>new Error('Error al subir archivos'));
  }

  download1(id:string): Observable<File>{
    const headers= new HttpHeaders().set('Content-Type', 'Aplication/json');
    return this.http.get<File>(`${id}`,
    {
      headers,
      responseType:'blob' as 'json'

    })
  }
}
