import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppPipeModule } from "../shared/pipe/app.pipe.module";
import { StudentInfoComponent } from "./student-info.component";
import { StudentListComponent } from "./student-list.component";

@NgModule ({
    declarations: [
        StudentListComponent,
        StudentInfoComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        AppPipeModule,
        RouterModule.forChild([
            {
                path: 'students', component: StudentListComponent
              },
              {
              path: '', redirectTo: 'students', pathMatch: 'full'
              },
              {
                path: 'students/info/:id', component: StudentInfoComponent
              }
            ])

    ]

})
export class StudentModule {

}
