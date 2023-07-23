import React from 'react';

import '../styles/ForgotPasswordModal.css';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
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
        <form>
          <div className="form-group">
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" required />
          </div>
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
