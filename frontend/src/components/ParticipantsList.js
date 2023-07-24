import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import '../styles/ParticipantsList.css';

export const ParticipantsList = ({ participants, handleRemoveParticipant, valuePerStudent }) => {

  return (
    <div className="participants-container">
      <h2>Alunos Participantes:</h2>
      {participants.length > 0 ? (
        <ul className="participants-list">
          {participants.map((participant, index) => (
            <li key={index}>
              {participant}
              <button onClick={() => handleRemoveParticipant(index)}>
                <AiOutlineDelete />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há alunos participantes ainda.</p>
      )}

      {/* Exibe o valor do evento por aluno */}
      <p>Valor do evento por aluno: R$ {valuePerStudent.toFixed(2)}</p>
    </div>
  );
};
