import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Superhero } from './store/superhero.model';
import { JsonServerResponse } from '../core/interfaces/http.interfaces';


@Injectable()
export class SuperheroesService {
  BASIC_URL = environment.envVar.API_URL;
  constructor(private http: HttpClient) {}

  getSuperheroes(page: number, size: number, search?: string):Observable<JsonServerResponse<Superhero[]>> {
    return this.http.get<JsonServerResponse<Superhero[]>>(
      `${this.BASIC_URL}superheroes?_page=${page}&_limit=${size}${search && `&id_like=${search}`}`
    );
  }

  deleteSuperhero(id:string) {
    return this.http.delete(`${this.BASIC_URL}superheroes/${id}`);
  }

  insertSuperhero(superhero:Superhero) { 
    return this.http.post(`${this.BASIC_URL}superheroes`, superhero);
  }

  patchSuperhero(superhero:Superhero) {
    return this.http.patch(`${this.BASIC_URL}superheroes/${superhero.id}`, superhero);
  }
}
