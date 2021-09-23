const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOptions = {
  orgim: '/',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(3100, () => {
  console.log('Server Started!');
});

app.route('/api/student').get((request, response) => {
  response.send(STUDENTS);
});

app.route('/api/student').post((request, response) => {
  let student = request.body;

  const firstId = STUDENTS ? Math.max.apply(null, STUDENTS.map(studentIterator => studentIterator.id)) + 1 : 1;
  student.id = firstId;
  STUDENTS.push(student);


  response.status(201).send(student);
});

app.route('/api/student/:id').put((request, response) => {
  const studentId = +request.params['id'];
  const student = request.body;

  const index = STUDENTS.findIndex(studentIterator => studentIterator.id === studentId);
  STUDENTS[index] = student;

  response.status(200).send(student);
});

app.route('/api/student/:id').get((request, response) => {
  const studentId = +request.params['id'];

  response.status(200).send(STUDENTS.find(studentIterator => studentIterator.id === studentId));
});

app.route('/api/student/:id').delete((request, response)=> {
  const studentId = +request.params['id'];
  STUDENTS = STUDENTS.filter(studentIterator => studentIterator.id !== studentId);

  response.status(204).send({});
});

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
	  classId: {id:2,name:"B"}
	},
	{
		id:5,
		ra:454643,
		name:"Nome do aluno 5",
		degreeId: {
      id:1,
      name:"Ensino Fundamental"
    },
	  	classId: {id:2,name:"B"}
	}
];
