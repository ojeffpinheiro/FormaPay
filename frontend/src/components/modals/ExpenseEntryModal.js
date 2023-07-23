import React, { useState } from "react";
import "../../styles/ExpenseEntryModal.css";

const ExpenseEntryModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    // Validation of fields (optional)
    if (description.trim() === "" || isNaN(amount) || Number(amount) <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Call the callback function to save the expense entry
    onSave({
      description,
      amount: Number(amount),
    });

    // Clear fields and close the modal
    setDescription("");
    setAmount("");
    onClose();
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
            <label htmlFor="amount">Valor:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="button" onClick={handleSave}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseEntryModal;
