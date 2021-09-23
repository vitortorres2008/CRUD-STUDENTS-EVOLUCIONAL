import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IStudents } from "./student.interface";
import { StudentService } from "./student.service";

@Component({
    templateUrl: './student-info.component.html'
})
export class StudentInfoComponent implements OnInit {

    public student!: IStudents;

    constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService) { }

    ngOnInit(): void {
      const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
        this.studentService.retrieveById(id).subscribe({
            next: student => this.student = student,
            error: err => console.log('Error', err)
        });
    }

    save(): void {
        this.studentService.save(this.student).subscribe({
            next: student => console.log('Saved with success', student),
            error: err => console.log('Error:', err)
        });
    }

}
