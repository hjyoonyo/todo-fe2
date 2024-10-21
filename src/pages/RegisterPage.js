import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [secPassword,setSecPassword]=useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (event) => { 
    event.preventDefault(); // form 제출 시 페이지 새로고침 방지
    //오류 핸들링
    try{
      //이름 미입력 오류
      if (!name) {
        throw new Error("이름을 입력해주세요.");
      }

      //이메일 미입력 오류
      if (!email) {
        throw new Error("이메일을 입력해주세요.");
      }

      //패스워드 미입력 오류
      if (!password) {
        throw new Error("패스워드를 입력해주세요.");
      }

      //패스워드 확인 미입력 오류
      if (!secPassword) {
        throw new Error("패스워드 확인을 입력해주세요.");
      }

      //패스워드 불일치 오류
      if(password !== secPassword){
        throw new Error("패스워드가 일치하지 않습니다. 다시 입력해주세요.");
      }

      //api
      const response = await api.post('/user',{name,email,password});
      if(response.status == 200){
        navigate("/login");
      }else{
        throw new Error(response.data.error);
      }
    }catch(error){
      setError(error.message);
    }
  }

  return (
    <div className="display-center">
      {/* 에러메세지 표시 */}
      {error && <div className="red-error">{error}</div>}

      <Form className="login-box" onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="string" placeholder="Name" onChange={(event)=>setName(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event)=>setEmail(event.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>setPassword(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control type="password" placeholder="re-enter the password" onChange={(event)=>setSecPassword(event.target.value)}/>
        </Form.Group>

        <Button className="button-primary" type="submit">
          회원가입
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
