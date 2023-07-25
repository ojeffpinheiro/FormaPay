import React, { useState } from 'react';

import '../../styles/ForgotPasswordModal.css';

/**
 * Componente de modal de recuperação de senha.
 * @param {boolean} isOpen - Indica se o modal está aberto.
 * @param {function} onClose - Função para fechar o modal.
 */
const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Realiza a validação do e-mail antes de enviar o formulário
    if (!isValidEmail(email)) {
      setErrorMessage('Por favor, insira um e-mail válido.');
      return;
    }
    // Lógica para enviar o link de redefinição de senha (a ser implementada)
    // ...

    // Limpa o e-mail e fecha o modal
    setEmail('');
    onClose();
  };

  const isValidEmail = (email) => {
    // Implemente aqui a validação do e-mail (opcional)
    // Exemplo simples de validação de e-mail:
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2>Esqueceu a senha?</h2>
        <p>
          Insira o seu e-mail cadastrado e enviaremos um link para redefinir a sua senha.
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Enviar</button>
        </form>
        <button className="close-button" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
