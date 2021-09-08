import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isOpen: boolean = false;
  constructor() {}

  toggleModal() {
    this.isOpen = !this.isOpen
  }
}
