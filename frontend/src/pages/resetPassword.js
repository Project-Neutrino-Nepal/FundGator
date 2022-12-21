import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function ResetPassword() {

  const [email, setEmail] = useState();



  const ResetPassword = async (e) => {
    try {
      e.preventDefault();
      // stop the form from reloading the page
      const data = {
        email: email,
      };
      console.log(data);
      await axios
        .put("http://localhost:5000/users/api/reset-password", data)
        .then((res) => {
          if (res.data.success === true) {
            alert("Password Reset Link Sent to Your Email");
            window.location.replace("/signin"); 
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="col-md-3 container text-center">
<h1>Reset Password</h1>
      <Form.Group className="m-3" controlId="formGridContent">
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder="Enter Valid Email" 
        onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" className="m-3" onClick={ResetPassword}>
Reset Password
      </Button>
    </Form>
  );
}

export default ResetPassword;
