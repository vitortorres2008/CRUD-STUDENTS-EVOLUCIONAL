import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IStudents } from "./student.interface";
import { StudentService } from "./student.service";
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';
import { Chart, PointElement, LinearScale, CategoryScale, BarController, BarElement } from 'chart.js';

@Component({
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  @ViewChild("myCanvas", { static: true })
  element!: ElementRef;

  filteredStudents: IStudents[] = [];

  _students: IStudents[] = [];

  _filterBy!: string;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.retrieveAll();
    this.updateChart();
  }

  updateChart() {
    Chart.register(PointElement, LinearScale, CategoryScale, BarController, BarElement)
    new Chart(this.element.nativeElement, {
      type: 'bar',
      data: {
        labels: ["A", "B", "C", "D", "E", "F"],
        datasets: [
          {
            data: [10, 72, 86, 81, 84, 86]
          }
        ]
      }
    });
  }

  retrieveAll(): void {
    this.studentService.retrieveAll().subscribe({
      next: student => {
        this._students = student;
        this.filteredStudents = this._students;
      },
      error: err => console.log('Error', err)
    })
  }

  deleteById(studentId: number): void {
    this.studentService.deleteById(studentId).subscribe({
      next: () => {
        console.log('Deleted with success');
        this.retrieveAll();
      },
      error: err => console.log('Error:', err)
    })
  }

  set filter(value: string) {
    this._filterBy = value;
    this.filteredStudents = this._students.filter((student: IStudents) => {
      const matchName = student.name.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1;
      const matchDegree = student.degreeId.toString().toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1;
      const matchClass = student.classId.toString().toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1;

      return matchName || matchDegree || matchClass;
    })
  }

  get filter() {
    return this._filterBy;
  }

  recoveryClassRandom() {
    const classes = ["A", "B", "C", "D", "E", "F"];
    const randomNumber = Math.random();
    const randomNumberAt9 = randomNumber * classes.length;
    const randomNumberWithoutDecimal = Math.trunc(randomNumberAt9);

    const classe = classes[randomNumberWithoutDecimal];

    return classe;
  }

  recoveryDegreeRandom() {
    const series = [
      "1 série",
      "2 série",
      "3 série",
      "4 série",
      "5 série",
      "6 série",
      "7° série",
      "8° série",
      "1° ano do ensino médio",
      "2° ano do ensino médio",
      "3° ano do ensino médio"
    ];
    const randomNumber = Math.random();
    const randomNumberAt9 = randomNumber * series.length;
    const randomNumberWithoutDecimal = Math.trunc(randomNumberAt9);

    const serie = series[randomNumberWithoutDecimal];

    return serie;
  }

  generateId() {
    return Math.trunc(Math.random() * 1000000000000);
  }

  async recoveryNewStudents() {
    const namesApi = new Array(300).fill("");

    const students = await Promise.all(namesApi.map(item => {
      const config: Config = {
        dictionaries: [names]
      }

      const characterName: string = uniqueNamesGenerator(config);

      return {
        "id": this.generateId(),
        "ra": this.generateId(),
        "name": characterName,
        "degreeId": this.recoveryDegreeRandom(),
        "classId":  this.recoveryClassRandom()
      }
    }))

    this._students = [...this._students, ... students];
  }
}
