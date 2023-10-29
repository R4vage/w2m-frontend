import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SuperheroesService } from '../superheroes.service';
import { environment } from 'src/environments/environment';
import { SUPERHEROES_MOCK } from '../mocks/superheroes.mock';

describe('SuperheroesService', () => {
  let service: SuperheroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroesService]
    });
    service = TestBed.inject(SuperheroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch superheroes', () => {
    const dummySuperheroes = SUPERHEROES_MOCK;

    service.getSuperheroes(1, 2).subscribe(response => {
      expect(response.data.length).toBe(2);
      expect(response.data).toEqual(dummySuperheroes);
      expect(response.totalCount).toBe(2);
    });

    const req = httpMock.expectOne(`${environment.envVar.API_URL}superheroes?_page=1&_limit=2`);
    expect(req.request.method).toBe('GET');
    req.flush({data:dummySuperheroes, totalCount:2});
  });

  it('should delete a superhero', () => {
    service.deleteSuperhero('1').subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.envVar.API_URL}superheroes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should insert a new superhero', () => {
    const newSuperhero = SUPERHEROES_MOCK[0];

    service.insertSuperhero(newSuperhero).subscribe(superhero => {
      expect(superhero).toEqual(newSuperhero);
    });

    const req = httpMock.expectOne(`${environment.envVar.API_URL}superheroes`);
    expect(req.request.method).toBe('POST');
    req.flush(newSuperhero);
  });

  it('should patch a superhero', () => {
    const patchedSuperhero = SUPERHEROES_MOCK[0];

    service.patchSuperhero(patchedSuperhero).subscribe(superhero => {
      expect(superhero).toEqual(patchedSuperhero);
    });

    const req = httpMock.expectOne(`${environment.envVar.API_URL}superheroes/${patchedSuperhero.id}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(patchedSuperhero);
  });
});