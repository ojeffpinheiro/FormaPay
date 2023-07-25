import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ForgotPasswordModal from "../components/modals/ForgotPasswordModal";

import "../styles/LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("ojeffpinheiro");
  const [password, setPassword] = useState("12345");
  const [showModal, setShowModal] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulação de autenticação bem-sucedida
    if (username === "ojeffpinheiro" && password === "12345") {
      navigate("/dashboard");
      setErrorMessage("");
    } else {
      setErrorMessage("Usuário ou senha incorretos.");
      setSuccessMessage("");
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    // Implementar a lógica para criar a conta com chamadas à API ou outros métodos de criação de conta.
    setSuccessMessage("Conta criada com sucesso!");
    setErrorMessage("");
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const toggleCreateAccountForm = () => {
    setShowCreateAccountForm((prev) => !prev);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">
        {showCreateAccountForm ? "Criar Conta" : "Login"}
      </h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form
        className="login-form"
        onSubmit={showCreateAccountForm ? handleCreateAccount : handleLogin}
      >
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!showCreateAccountForm && (
          <p className="forgot-password" onClick={handleForgotPassword}>
            Esqueceu sua senha?
          </p>
        )}
        <button type="submit" className="login-button">
          {showCreateAccountForm ? "Criar Conta" : "Login"}
        </button>
      </form>
      <div className="toggle-form">
        {showCreateAccountForm ? (
          <>
            Já tem uma conta?{" "}
            <span className="toggle-link" onClick={toggleCreateAccountForm}>
              Fazer login
            </span>
          </>
        ) : (
          <>
            Não tem uma conta?{" "}
            <span className="toggle-link" onClick={toggleCreateAccountForm}>
              Criar conta
            </span>
          </>
        )}
      </div>

      {showModal && (
        <ForgotPasswordModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default LoginPage;