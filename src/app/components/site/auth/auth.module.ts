import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material.module';

import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { authReducer } from './store/auth.reducer';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forFeature('auth', authReducer),
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
})
export class AuthModule {}
