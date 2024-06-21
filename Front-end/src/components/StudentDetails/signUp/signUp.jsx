import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function StudentSignup() {

    const navigate=useNavigate();
    const [validated, setValidated] = useState(false);
    const [studentData, setStudentData] = useState({
        name: "",
        age: "",
        gender: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudentData({ ...studentData, [name]: value });
    }

    console.log("student data", studentData);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const { name, age, email, password, gender } = studentData;

        if (!name || !age || !email || !password || !gender) {
            alert("Enter all the details");
            return;
        }
        sendDataToServer();

    };

    const sendDataToServer = async () => {
        try {
            let res = await axios.post('http://localhost:3050/students/create', studentData);
            console.log("response", res);

            if (res.status === 200) {
                alert("SignUp Successful");
                navigate("/student/login")
            }

        } catch (error) {
            console.log("error occured on the send data to server", error);
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        value={studentData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        name="name"
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        placeholder="age"
                        onChange={handleChange}
                        name="age"
                        value={studentData.age}
                    />

                </Form.Group>

                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            required
                            onChange={handleChange}
                            value={studentData.email}
                            name="email"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className="mb-3">

                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select required
                        aria-label="Default select example"
                        name="gender"
                        onChange={handleChange}>

                        <option value="">Enter Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid gender.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="password"
                        value={studentData.password}
                        onChange={handleChange}
                        name="password"
                        required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Button type="submit">Submit form</Button>
        </Form>
    );
};

