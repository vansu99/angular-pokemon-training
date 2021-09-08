import { Component } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  isOpen: boolean = false;
  constructor() {
    console.log('modal run')
  }

  toggleModal() {
    this.isOpen = !this.isOpen
  }
}
