import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

export function StudentLogin() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [studentGetData, setStudentGetData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentGetData({ ...studentGetData, [name]: value });
    };
    console.log("Student get data", studentGetData);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        setValidated(true);

        const { email, password } = studentGetData;
        if (!email || !password) {
            alert("Enter valid email and password");
            return;
        }
        sendLoginDataToServer();
    };

    const sendLoginDataToServer = async () => {
        try {
            let res = await axios.get('http://localhost:3050/students/studentLogin', studentGetData);
            console.log("login response", res)

            if (res.status === 200) {
                alert("Login Successfull");
                navigate("./");
            } else {
                navigate("/forgotPassword");
            }
        } catch (error) {
            console.log("error in the login data");
        }
    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Enter Email"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={studentGetData.email}
                            onChange={handleChange}
                            name="email"
                        />
                        <Form.Control.Feedback type="invalid">
                            fill the correct email.
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"
                        placeholder="password"
                        value={studentGetData.password}
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

