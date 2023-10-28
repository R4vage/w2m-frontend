import { Injectable } from '@angular/core';

import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginatorInt extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Items por página'
}
