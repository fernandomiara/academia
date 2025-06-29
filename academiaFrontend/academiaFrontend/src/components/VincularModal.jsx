import React, { useState } from 'react';
import '../css/treino.css';

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const VincularModal = ({ treino, onConfirm, onClose }) => {
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [dia, setDia] = useState(1); // Segunda por padrão

  const handleConfirm = () => {
    if (series && repeticoes) {
      onConfirm({ ...treino, series, repeticoes, dia });
    }
  };

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div className="modal-content" style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        minWidth: '420px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        background: 'linear-gradient(to bottom right, #007BFF, #ffffff)',
        backgroundrepeat: 'no-repeat',
        backgroundattachment: 'fixed',
        backgroundsize: 'cover'
      }}>
        <h2>{treino.titulo}</h2>

        {/* Botões dos dias da semana */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0.5rem',
          marginBottom: '1rem',
          width: '100%'
        }}>
          {diasSemana.map((d, idx) => (
            <button
              key={idx}
              onClick={() => setDia(idx)}
              style={{
                backgroundColor: dia === idx ? '#007BFF' : '#ccc',
                color: 'white',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                minWidth: '48px', // garante largura igual
                textAlign: 'center'
              }}
            >
              {d}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <input
          type="number"
          placeholder="Séries"
          value={series}
          onChange={(e) => setSeries(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <input
          type="number"
          placeholder="Repetições"
          value={repeticoes}
          onChange={(e) => setRepeticoes(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        {/* Botões de ação */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
          <button onClick={handleConfirm} className="input-button-salvar" >Confirmar</button>
          <button onClick={onClose} className="input-button-limpar">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default VincularModal;