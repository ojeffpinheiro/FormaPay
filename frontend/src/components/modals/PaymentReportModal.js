import React, { useState } from "react";
import "../../styles/PaymentReportModal.css";

const PaymentReportModal = ({ isOpen, onClose, onGenerateReport }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerateReport = () => {
    if (validateFields()) {
      onGenerateReport(startDate, endDate);

      // Limpar campos e fechar o modal
      setStartDate("");
      setEndDate("");
      onClose();
    }
  };

  const validateFields = () => {
    if (startDate.trim() === "" || endDate.trim() === "") {
      setErrorMessage("Por favor, preencha todas as datas.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  return (
    <div className={`modal-container ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Geração de Relatório</h2>
        <form>
          <div className="form-group">
            <label htmlFor="startDate">Data de Início:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">Data de Término:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleGenerateReport}
              className="generate-button"
            >
              Gerar Relatório
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentReportModal;
