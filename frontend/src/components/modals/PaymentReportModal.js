import React, { useState } from "react";
import "../../styles/PaymentReportModal.css";

const PaymentReportModal = ({ isOpen, onClose, onGenerateReport }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateReport = () => {
    // Validation of fields (optional)
    if (startDate.trim() === "" || endDate.trim() === "") {
      alert("Por favor, preencha todas as datas.");
      return;
    }

    // Call the callback function to generate the report
    onGenerateReport(startDate, endDate);

    // Clear fields and close the modal
    setStartDate("");
    setEndDate("");
    onClose();
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
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancelar
            </button>
            <button type="button" onClick={handleGenerateReport} className="generate-button">
              Gerar Relatório
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentReportModal;
