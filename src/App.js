import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import {useState, useEffect} from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  //user 생성 (많은 페이지에서 필요하므로 App.js에 만든다)
  const [user,setUser] = useState(null);
  const getUser = async () => {
    //토큰을 통해 유저 정보를 가져온다.
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        //api.defaults.headers['authorization'] = "Bearer "+storedToken;
        // 맨 처음 세팅하는 것 => api.js
        const response = await api.get("/user/me");
        console.log("rrrr", response);
        setUser(response.data.user);
      }
    } catch (error) {
        setUser(null);
    }
  }

  //ui가 준비되면 바로 getUser() 호출.
  //컴포넌트가 처음 렌더링될 때 한 번 실행되는 효과(사이드 이펙트)를 정의
  useEffect(() => {
    getUser();
  }, []);  

  return (
    <Routes>
      {/* Protectex Route */}
      <Route path="/" element={
        <PrivateRoute user={user}>
          <TodoPage />
        </PrivateRoute>
      } />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage user={user} setUser={setUser} />}  />
    </Routes>
  );
}

export default App;
