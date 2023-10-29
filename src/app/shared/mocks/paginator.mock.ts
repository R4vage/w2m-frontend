import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageEvent } from '@angular/material/paginator';

export const DEFAULT_PAGE_INFO: PageEvent = {
  pageIndex: 0,
  pageSize: 10,
  length: 0,
};

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>Paginator Mock</h1>',
})
export class PaginatorComponentMock {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Output() pageEventEmitter = new EventEmitter<PageEvent>();
}
