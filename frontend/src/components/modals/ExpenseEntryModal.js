import React, { useState } from "react";
import "../../styles/ExpenseEntryModal.css";

const ExpenseEntryModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [amountPerStudent, setAmountPerStudent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Função para salvar o registro de gasto
  const handleSaveExpense = () => {
    if (validateFields()) {
      onSave({
        description,
        amountPerStudent: Number(amountPerStudent),
      });

      // Limpar campos e fechar o modal
      setDescription("");
      setAmountPerStudent("");
      onClose();
    }
  };

  // Função para validar os campos
  const validateFields = () => {
    if (description.trim() === "" || isNaN(amountPerStudent) || Number(amountPerStudent) <= 0) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Informar dados do Evento</h2>
        <form>
          <div className="form-group">
            <label htmlFor="description">Descrição:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amountPerStudent">Valor por aluno:</label>
            <input
              type="number"
              id="amountPerStudent"
              value={amountPerStudent}
              onChange={(e) => setAmountPerStudent(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="button" onClick={handleSaveExpense}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEntryModal;
