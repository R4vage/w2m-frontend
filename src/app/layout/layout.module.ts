import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

import { LayoutComponent } from './layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule,
];

@NgModule({
  declarations: [LayoutComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: [LayoutComponent]
})
export class LayoutModule {}
