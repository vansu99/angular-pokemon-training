import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>()
  constructor() {}

  close(): void {
    this.closeModal.emit()
  }
}
