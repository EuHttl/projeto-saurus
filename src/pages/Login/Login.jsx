import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Login.css";
const Spinner = () => <div className="spinner"></div>;

function Login() {
  const [user, setUser] = useState("saurus");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useMock, setUseMock] = useState(true); // Alternar entre mock e API real
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (useMock) {
        // Modo de desenvolvimento - Mock
        console.log("LOGIN SIMULADO: Gerando um token falso para desenvolvimento.");
        
        // Simular delay da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Token falso para desenvolvimento
        const fakeToken = "token_falso_para_dev";
        localStorage.setItem("authToken", fakeToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${fakeToken}`;
        
        console.log("Login simulado realizado com sucesso!");
        navigate("/pedidos");
        return;
      }

      // Modo de produção - API real
      console.log("Fazendo login com API real...");
      
      const response = await api.post("/api/v2/auth", {
        usuario: user,
        senha: password,
        applicationId: "061f92f5-f2a2-410a-8e2b-b3a28132c258"
      });

      // Extrair o token da resposta
      const token = response.data.token || response.data.access_token || response.data.jwt;
      
      if (!token) {
        throw new Error("Token não encontrado na resposta da API");
      }

      // Salvar o token no localStorage
      localStorage.setItem("authToken", token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      console.log("Login realizado com sucesso!");
      navigate("/pedidos");
      
    } catch (err) {
      console.error("Erro no login:", err);
      
      // Tratamento de erros específicos
      if (err.response) {
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 401) {
          setError("Credenciais inválidas. Verifique usuário e senha.");
        } else if (status === 400) {
          setError("Dados inválidos. Verifique os campos preenchidos.");
        } else if (status >= 500) {
          setError("Erro no servidor. Tente novamente mais tarde.");
        } else {
          setError(data?.message || "Erro na autenticação. Tente novamente.");
        }
      } else if (err.request) {
        // Erro de rede (sem resposta do servidor)
        setError("Erro de conexão. Verifique sua internet e tente novamente.");
      } else {
        // Outros erros
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <select className="login-input" style={{ marginBottom: 10 }} disabled>
          <option>RETAGUARDA APP (PROD)</option>
        </select>
        <input
          className="login-input"
          type="text"
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          placeholder="Id Usuário"
          autoComplete="username"
        />
        <input
          className="login-input"
          type="text"
          id="cnpjCpf"
          placeholder="CNPJ / CPF"
          style={{ marginBottom: 10 }}
        />
        <input
          className="login-input"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Senha"
          autoComplete="current-password"
        />
        
        {/* Toggle para alternar entre mock e API real */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <input
            type="checkbox"
            id="ambiente"
            checked={!useMock}
            onChange={(e) => setUseMock(!e.target.checked)}
            style={{ marginRight: 8 }}
          />
          <label
            htmlFor="ambiente"
            style={{ fontSize: 14, color: "#e63946", fontWeight: 500 }}
          >
            {useMock ? "Modo Desenvolvimento (Mock)" : "Ambiente de Produção (API Real)"}
          </label>
        </div>
        
        <button
          type="submit"
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Acessar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <p style={{ 
          fontSize: 12, 
          color: useMock ? "#ff6b35" : "#28a745", 
          textAlign: "center",
          margin: "8px 0 0 0"
        }}>
          {useMock 
            ? "🔧 Modo Desenvolvimento: Usando dados simulados" 
            : "🚀 Modo Produção: Conectando com API real da Saurus"
          }
        </p>
      </form>
    </div>
  );
}

export default Login;
