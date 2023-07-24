import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import '../styles/ParticipantsList.css';

export const ParticipantsList = ({ participants, handleRemoveParticipant }) => {

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
    </div>
  );
};
