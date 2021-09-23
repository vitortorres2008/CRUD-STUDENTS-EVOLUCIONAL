import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IStudents } from "./student.interface";

@Injectable ({
    providedIn: 'root'
})

export class StudentService {

    private studentsUrl: string = 'http://localhost:3100/api/student';

    constructor(private httpClient: HttpClient){ }


    retrieveAll(): Observable<IStudents[]> {
        return this.httpClient.get<IStudents[]>(this.studentsUrl);
    }

    retrieveById(id: number): Observable<IStudents> {
        return this.httpClient.get<IStudents>(`${this.studentsUrl}/${id}`);
    }

    save(student: IStudents): Observable<IStudents> {
        if(student.id) {
            return this.httpClient.put<IStudents>(`${this.studentsUrl}/${student.id}`, student);
        } else {
            return this.httpClient.post<IStudents>(`${this.studentsUrl}`, student);
        }
    }

    deleteById(id: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.studentsUrl}/${id}`);

    }
}

var STUDENTS = [
  {
		id:1,
		ra:12346,
		name:"Nome do aluno 1",
		degreeId: {
      id:1,
      name:"Ensino Fundamental"
    },
		classId: {id:1,name:"A"}
	},
	{
		id:2,
		ra:456798,
		name:"Nome do aluno 2",
		degreeId: {
      id:1,
      name:"Ensino Fundamental"
    },
		classId: {id:2,name:"B"}
	},
	{
		id:3,
		ra:752156,
		name:"Nome do aluno 3",
		degreeId: {
      id:1,
      name:"Ensino Fundamental"
    },
		classId: {id:3,name:"C"}
	},
	{
		id:4,
		ra:852348,
		name:"Nome do aluno 4",
		degreeId: {
      id:1,
      name:"Ensino Fundamental"
    },
	  classId: {id:4,name:"D"}
	},
	{
		id:5,
		ra:454643,
		name:"Nome do aluno 5",
		degreeId: {
      id:1,
      name:"Ensino Fundamental"
    },
	  	classId: {id:5,name:"E"}
	}
];
