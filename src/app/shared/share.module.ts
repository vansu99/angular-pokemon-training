import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ModalComponent } from '@shared/app-modal/modal.component'
import { AppHeaderComponent } from './app-header/app-header.component'
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ModalComponent, AppHeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [ModalComponent, AppHeaderComponent],
})
export class ShareModule {}
