import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from './routes.enum';

@Injectable({
  providedIn: 'root'
})
export class ExtendedRouter extends Router {
  override routesEnum = AppRoutes;
}