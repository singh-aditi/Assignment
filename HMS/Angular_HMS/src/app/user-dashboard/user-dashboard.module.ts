import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule, NbTreeGridModule } from '@nebular/theme';
import { UserDashboardComponent } from './user-dashboard.component';


@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    RouterModule,  
    NbLayoutModule,
    NbSidebarModule,  
    NbButtonModule,
    NbTreeGridModule,
  ],
  exports: [
    UserDashboardComponent
  ]
})
export class UserDashboardModule { }
