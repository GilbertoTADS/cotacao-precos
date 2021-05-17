import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators';

import { Supplier } from './../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url_api:string = 'http://localhost:3000'

  constructor( private http:HttpClient ) { }
  
  login(identifier:string,password:string):Observable<Supplier[]>{ 
    let headers:Headers = new Headers();
    headers.append('Content-type','application/json');

    return this.http.get<Supplier[]>(`${this.url_api}/fornecedor`).pipe(
      catchError(this.handleError('getSupplier', []))
    )
  }
  private handleError(operation:string = 'operation', result?:any){
    return (error: any): Observable<any> => {
      return of(result as any);
    }
  }
}
