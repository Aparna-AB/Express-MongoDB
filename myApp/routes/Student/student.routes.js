const {
    createNewStudent,
    studentLogin,
    getAllStudents,
    getStudentById,
    deleteStudentById,
    updateStudentById,
} = require("./student.controller");
const studentRoutes = require("express").Router();

studentRoutes.post("/create", createNewStudent);
studentRoutes.post("/studentLogin", studentLogin);
studentRoutes.get("/", getAllStudents);
studentRoutes.get("/:id", getStudentById);
studentRoutes.patch("/:id", updateStudentById);
studentRoutes.delete("/:id", deleteStudentById);

module.exports = { studentRoutes };