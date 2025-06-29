import React, { useState, useEffect } from 'react';
import TreinoCardDisponivel from '../../components/CardTreinoDisponivel';
import TreinoCardVinculado from '../../components/CardTreinoVinculado';
import VincularModal from '../../components/VincularModal';
import '../../css/Treino.css'
import axios from 'axios';
import { salvarModeloTreino, buscarTodosTreinos } from '../../apis/VinculoTreinoAPI';

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const VinculoTreino = () => {
  const [nomeTreino, setNomeTreino] = useState('');
  const [busca, setBusca] = useState('');
  const [treinosDisponiveis, setTreinosDisponiveis] = useState([]);
  const [treinosVinculados, setTreinosVinculados] = useState({
    0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []
  });
  const [modalTreino, setModalTreino] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(1); // Segunda por padrão

    // 🔄 Carrega os treinos da API
  useEffect(() => {
    const fetchTreinos = async () => {
        try {
        const data = await buscarTodosTreinos();
        setTreinosDisponiveis(data);
        } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        }
    };

    fetchTreinos();
    }, []);
  const handleVincular = (treino) => {
    setModalTreino(treino);
  };

  const confirmarVinculo = (treinoComInfo) => {
    const dia = treinoComInfo.dia;
    setTreinosVinculados((prev) => ({
      ...prev,
      [dia]: [...prev[dia], treinoComInfo]
    }));
    setModalTreino(null);
  };

  const treinosFiltrados = treinosDisponiveis.filter(t =>
    t.titulo.toLowerCase().includes(busca.toLowerCase())
  );

const handleSalvarTreino = async () => {
  if (!nomeTreino.trim()) {
    alert("Digite um nome para o treino.");
    return;
  }

  // Agrupar todos os treinos vinculados dos 7 dias
  const exercicios = Object.values(treinosVinculados)
    .flat()
    .map((treino, index) => ({
      id: treino.id,
      series: treino.series,
      repeticoes: treino.repeticoes,
      dia: treino.dia,
      ordem: index,
    }));

  const payload = {
    nome: nomeTreino,
    professor: 1,
    exercicios: exercicios
  };

  try {
    await salvarModeloTreino(payload);
    alert("Treino salvo com sucesso!");
    setNomeTreino('');
    setTreinosVinculados({ 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] });
  } catch (error) {
    alert("Erro ao salvar treino.");
  }
};

const handleLimparTreino = () => {
  setNomeTreino('');
  setTreinosVinculados({ 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] });
}

  return (
    <div style={{ padding: '2rem' }}>
      {/* Campo para nome do treino geral */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
                type="text"
                placeholder="Nome do treino"
                value={nomeTreino}
                onChange={(e) => setNomeTreino(e.target.value)}
                className="input-texto"
            />
            <button
                onClick={handleSalvarTreino}
                className="input-button-salvar"
            >
                Salvar
            </button>
            <button
                onClick={handleLimparTreino}
                className="input-button-limpar"
            >
                Limpar
            </button>
      </div>

      <div style={{ display: 'flex', gap: '2rem'}}>
        {/* Quadro 1: Treinos disponíveis */}
        <div className="quadroDisponivel">
          <h2 className="margin-esquerda-quadro" style={{marginLeft: '0.5rem'}}>Treinos Disponíveis</h2>
          <input
            type="text"
            placeholder="Buscar treino..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ width: '96%', padding: '0.5rem', marginBottom: '1rem', marginLeft: '0.5rem' }}
          />
          <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                justifyContent: 'flex-start'
            }}
            >
            {treinosFiltrados.map((treino) => (
                <TreinoCardDisponivel key={treino.id} treino={treino} onClick={handleVincular} />
            ))}
            </div>
        </div>

        {/* Quadro 2: Treinos Vinculados por dia */}
        <div className="quadroDisponivel">
          <h2 className="margin-esquerda-quadro">Treinos Vinculados</h2>

          {/* Botões dos dias */}
          <div className="abas-container">
            {diasSemana.map((dia, index) => (
              <button
                key={index}
                onClick={() => setDiaSelecionado(index)}
                className={`aba ${diaSelecionado === index ? 'ativa' : ''}`}
              >
                {dia}
              </button>
            ))}
          </div>

          {/* Cards do dia selecionado */}
          {treinosVinculados[diaSelecionado]?.map((treino, idx) => (
            <TreinoCardVinculado key={idx} treino={treino} />
            ))}
        </div>
      </div>

      {/* Modal */}
      {modalTreino && (
        <VincularModal
          treino={modalTreino}
          onConfirm={confirmarVinculo}
          onClose={() => setModalTreino(null)}
        />
      )}
    </div>
  );
};

export default VinculoTreino;