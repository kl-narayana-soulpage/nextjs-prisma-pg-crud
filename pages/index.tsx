import { useState, useEffect } from "react";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function Index() {
  const [state, setState] = useState<any>(null);
  const [user_name, setUser_name] = useState<any>(null);
  const [email, setEmail] = useState<any>(null);
  const [posted, setPosted] = useState<any>(null);

  const userDetails = async () => {
    const response = await fetch("/api/postData", {
      method: "post",
      body: JSON.stringify({
        name: user_name,
        email: email,
      }),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    setPosted(data);
    setUser_name("");
    setEmail("");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/hello");
      const data = await response.json();
      // const data1 = JSON.parse(data);
      // console.log(data);
      setState(data);
    };
    try {
      getData();
    } catch (e: any) {
      console.log(e);
    }
  }, [posted]);

  return (
    <div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              required
              value={user_name}
              onChange={(e: any) => setUser_name(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              required
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <button onClick={userDetails} className="btn btn-primary d-grid">
              Register
            </button>
          </div>
        </div>
      </div>
      {/* This is a index page: {state?.name[0].email} */}

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>UserName</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {state?.name.map((list: any, index: any) => (
                  <tr key={index}>
                    <td>{list.id}</td>
                    <td>{list.name}</td>
                    <td>{list.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
