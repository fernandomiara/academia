import React from 'react';
import '../css/Treino.css';

const CardTreinoDisponivel = ({ treino, onClick }) => {
  return (
    <div className="treino-card-disponivel" onClick={() => onClick(treino)}>
      <h4>{treino.titulo}</h4>
      <small>{treino.tipo}</small>
    </div>
  );
};

export default CardTreinoDisponivel;