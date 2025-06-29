import React from 'react';
import '../css/Treino.css'

const CardTreino = ({ treino, onClick }) => {
  return (
    <div className="treino-card-disponivel" onClick={() => onClick(treino)}>
      <h3>{treino.nome}</h3>
    </div>
  );
};

export default CardTreino;