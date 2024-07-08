const express = require('express')
const DBconnect = require('./src/config/dbConfig')
const bodyParser = require('body-parser')
const httpErrors = require('http-errors')
const morgan = require('morgan')

const router = require('./src/routes/routerIndex')
const userRouter = require('./src/routes/UserRouter')
const bannerRouter = require('./src/routes/BannerRouter')
const prescriptionRouter = require('./src/routes/PrescriptionRouter')
const cors = require('cors')
const doctorRouter = require('./src/routes/Doctor.Router')
const medicalRecordRouter = require('./src/routes/MedicalRecordRouter')
const hospitalRouter = require('./src/routes/HospitalRouter')
const appointmentRouter = require('./src/routes/AppointmentRouter')
const chatRouter = require('./src/routes/ChatRouter')
const conversationRouter = require('./src/routes/ConversationRouter')
const answerRouter = require('./src/routes/AnswerRouter')
const questionRouter = require('./src/routes/QuestionRouter')

require('dotenv').config()
const app = express()
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors(corsOptions))

//router


app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to HealthCare"
    })
})
app.use('/user', userRouter);
app.use('/user/medical-record', medicalRecordRouter)
app.use('/doctor/medical-record', medicalRecordRouter)
app.use('/chat', chatRouter)
app.use('/conversation', conversationRouter)
app.use('/banner', bannerRouter)
app.use('/hospital', hospitalRouter)
app.use('/appointment', appointmentRouter)
router();
app.use('/user', userRouter)
app.use('/question', questionRouter)
app.use('/answer', answerRouter)
app.use('/prescription', prescriptionRouter)

const portSocket = 3000
const { createServer } = require('http')
const { Server } = require('socket.io')
const ChatController = require('./src/controllers/ChatController')


const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    socket.on("newConversation", (conversation) => {
        console.log("newConversation");
        io.emit("newConversation", conversation);
    });

    socket.on("message", async (data) => {
        const { roomId, message } = data;
        console.log("Message", {
            roomId,
            message,
        });

        const newChat = await ChatController.createChat(message);
        // Handle incoming chat messages
        io.to(roomId).emit("message", newChat); // Broadcast the message to all connected clients
    });

    socket.on("joinRoom", (roomId) => {
        console.log("roomId", roomId);
        socket.join(roomId);
    });
});

//httpServer.listen(portSocket);

// app.use('/doctor', docProfileRouter)
DBconnect();

app.use(async (req, res, next) => {
    next(httpErrors.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        "error": {
            "status": err.status || 500,
            "message": err.message
        }
    })
})


app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Server is running port: http://${process.env.HOST_NAME}:${process.env.PORT}`);
})