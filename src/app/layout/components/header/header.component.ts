import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropDownAnimation } from 'src/app/shared/animations/menu.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [DropDownAnimation]
})
export class HeaderComponent {
  @Input() menuItems!: string[];
  @Output() buttonClicked = new EventEmitter<string>();
  isMenuOpened = false;

  navigate(url:string){
    this.buttonClicked.emit(url)
    this.isMenuOpened=false;
  }

}
