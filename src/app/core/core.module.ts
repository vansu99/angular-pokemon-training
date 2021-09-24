import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeTitleFormPipe } from './pipes/change-title-form.pipe';
import { StorageService } from './services/storage.service'


@NgModule({
  declarations: [
    ChangeTitleFormPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChangeTitleFormPipe
  ]
})
export class CoreModule { }
