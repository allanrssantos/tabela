import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contatos } from './../models/contatos';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {
  private readonly _api: string = 'http://localhost:3000/Contatos/';

  constructor(private readonly _http: HttpClient) {}

  retornarTodos(): Observable<Contatos[]> {
    return this._http
      .get(this._api)
      .pipe(catchError(this.handleError), map(this.jsonDataToClientes));
  }

  buscarPorId(id: number): Observable<Contatos> {
    const url = `${this._api}/${id}`;

    return this._http
      .get(url)
      .pipe(catchError(this.handleError), map(this.jsonDataToContato));
  }

  gravar(contatos: Contatos): Observable<Contatos> {
    return this._http
      .post(this._api, contatos)
      .pipe(catchError(this.handleError), map(this.jsonDataToContato));
  }

  atualizar(contatos: Contatos): Observable<Contatos> {
    const url = `${this._api}`;
    return this._http.put(url, contatos).pipe(
      catchError(this.handleError),
      map(() => contatos)
    );
  }

  deletar(id: number): Observable<any> {
    const url = `${this._api}/${id}`;
    return this._http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // Métodos privados

  private jsonDataToClientes(jsonData: any[]): Contatos[] {
    const _clientes: Contatos[] = [];
    jsonData.forEach((element) => _clientes.push(element as Contatos));
    return _clientes;
  }

  private jsonDataToContato(jsonData: any): Contatos {
    return jsonData as Contatos;
  }

  private handleError(error: any): Observable<any> {
    return throwError(error);
  }
}
