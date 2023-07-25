import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import '../styles/ParticipantsList.css';

/**
 * Componente que exibe a lista de participantes de um evento.
 * @param {Array} participants - Array contendo os participantes do evento.
 * @param {function} handleRemoveParticipant - Função para remover um participante da lista.
 * @param {number} valuePerStudent - Valor do evento por aluno.
 */
const ParticipantsList = ({ participants, handleRemoveParticipant, valuePerStudent }) => {
  // Verifica se há participantes válidos
  const hasParticipants = participants && participants.length > 0;

  return (
    <div className="participants-container">
      <h2>Alunos Participantes:</h2>
      {hasParticipants ? (
        <ul className="participants-list">
          {participants.map((participant, index) => (
            <li key={index}>
              {participant.studentName} - R$ {participant.amountPaid}
              <button onClick={() => handleRemoveParticipant(index)}>
                <AiOutlineDelete />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há alunos participantes ainda.</p>
      )}
      {/* Exibe o valor do evento por aluno, caso esteja definido */}
      {valuePerStudent && (
        <p>Valor do evento por aluno: R$ {valuePerStudent}</p>
      )}
    </div>
  );
};

export default ParticipantsList;