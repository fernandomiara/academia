import React from 'react';
import '../css/Treino.css';

const CardTreinoVinculado = ({ treino }) => {
  return (
    <div className="treino-card-vinculado">
      <h3>{treino.titulo}</h3>
      <p>Grupo: {treino.grupoMuscular}</p>
      <p>Séries: {treino.series}</p>
      <p>Repetições: {treino.repeticoes}</p>
    </div>
  );
};

export default CardTreinoVinculado;