import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { CustomPaginatorInt } from './paginator-int.service';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  providers: [{provide: MatPaginatorIntl, useClass: CustomPaginatorInt}]
})
export class PaginatorComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Output() pageEventEmitter = new EventEmitter<PageEvent>();
  
  pageSizeOptions = [2,5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  handlePageEvent(e: PageEvent) {
    this.pageEventEmitter.emit(e)
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
