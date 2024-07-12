import CommonResponse from "@/format/response/CommonResponse";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post<CommonResponse<AuthToken>>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/members/login`,
        { username: username, password: password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        if (response.status === 200 && response.data.code === "200") {
          const token = response.data.data;
          localStorage.setItem("token", token?.token ?? "");
          router.push("/");
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        setError("인증서버에서 오류가 발생하였습니다.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>로그인</Head>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label>아이디</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label>패스워드</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface AuthToken {
  username: string;
  token: string;
}

export default Login;
