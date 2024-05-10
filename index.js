import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://mangala214128pa:maggi12@cluster0.u3upwel.mongodb.net/');
const db = mongoose.connection;

const MentorSchema = new mongoose.Schema({
    name: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student' 
    }]
}, { versionKey: false });

const StudentSchema = new mongoose.Schema({
    name: String,
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mentor' 
    }
}, { versionKey: false });

const Mentor = mongoose.model('Mentor', MentorSchema);
const Student = mongoose.model('Student', StudentSchema);

// Get home page
app.get('/', (req, res) => {
    try {
        const htmlContent = `
            <html>
                <head>
                    <title>Welcome to Mentor and Student Assigning</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                        .container {
                            text-align: center;
                        }
                        h1 {
                            color: #333;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Welcome to Mentor and Student Assigning with Database API 😊</h1>
                    </div>
                </body>
            </html>
        `;
        res.status(200).send(htmlContent);
    } catch (error) {
        res.status(500).json({
            message: "Internal server Error"
        });
    }
});


// Create Mentor API
app.post('/schedule/mentors', async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        console.log(mentor);

        res.status(200).json({ message: "Mentor created successfully", mentor: mentor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Create Student API
app.post('/schedule/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        res.status(200).json({ message: "Students created successfully", student: student });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Assign a mentor to a student
app.put('/schedule/assign-mentor/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;
        const student = await Student.findByIdAndUpdate(
            studentId,
            { mentor: mentorId },
            { new: true }
        );
        res.status(200).json({
            message: 'Assigned a student successfully',
            student
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Show all students for a particular mentor
app.get('/schedule/mentor-students/:mentorId', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const students = await Student.find({ mentor: mentorId });
        res.status(200).json({
            message: 'Successfully fetched students data with mentor',
            students
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Show previously assigned mentor for a particular student
app.get('/schedule/student-mentor/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId).populate('mentor');
        res.status(200).json({
            message: 'Successfully fetched',
            Student: student.mentor
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
