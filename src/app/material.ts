import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatTooltipModule, MatButtonModule,
     MatDialogModule, MatTabsModule, MatGridListModule, MatInputModule, MatFormFieldModule,
     MatSnackBarModule,MatTableModule,MatSelectModule,MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { CommonModule } from '@angular/common';

//import { MatMomentDateModule} from '@angular/material-moment-adapter';




@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule,
        CommonModule,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatTableModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
       
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTooltipModule,
        MatButtonModule,
        MatDialogModule,
        MatTabsModule,
        MatGridListModule,
        MatInputModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatTableModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule
       
    ],
})
export class MaterialModule { }