<h1>API endpoints for Mentor - Student 😊</h1>
1) Create Mentor (POST) :Establish a new mentor profile. Endpoint: /schedule/mentors<br/>
2) Create Student (POST) :Register a new student. Endpoint: /schedule/students<br/>
3) Assign Student to Mentor (PUT):Link a student to a mentor, fostering a learning relationship. Endpoint: /schedule/assign-mentor/assign/:studentId<br/>
4) Change Mentor for Student (PUT)]: Assign a new mentor to a student or modify an existing mentor-student relationship. Endpoint: /schedule/assign-mentor/:studentId<br/>
5) Get All Students for a Mentor (GET) : Retrieve a comprehensive list of all students under the guidance of a specific mentor. Endpoint: /schedule/mentor-students/:mentorId<br/>
6) Show previously assigned mentor for a particular student (GET) :Access the historical data of a student's previously assigned mentor. Endpoint: /schedule/student-mentor/:studentId<br/>

 <h1>[Postman Link]</h1>
https://api.postman.com/collections/32502504-334657cb-0002-4097-a63f-02a65d9811b2?access_key=PMAT-01HN7D7VGNB61TRJAB4YMD2PWZ

