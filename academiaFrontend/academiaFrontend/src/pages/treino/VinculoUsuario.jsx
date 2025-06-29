import React, { useState, useEffect } from 'react';
import TreinoCard from '../../components/CardTreino';
import '../../css/Treino.css'
import { buscarTodosUsuarios } from '../../apis/UsuariosAPI';
import { buscarTodosModelos, vincularUsuarioTreino, consultaModelosUsuario } from '../../apis/VinculoTreinoAPI';
import ConfirmModal from "../../components/ConfirmModal";

const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

const VinculoUsuario = () => {
  const [busca, setBusca] = useState('');
  const [treinosDisponiveis, setTreinosDisponiveis] = useState([]);
  const [treinosVinculados, setTreinosVinculados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
  const [treinoSelecionado, setTreinoSelecionado] = useState(null);
  const [carregado, setCarregado] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

    // 🔄 Carrega os treinos da API
  useEffect(() => {
    const fetchTreinos = async () => {
        try {
        const data = await buscarTodosModelos(1);
        setTreinosDisponiveis(data);
        } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        }
    };

    fetchTreinos();
    }, []);

  const handleVincular = async () => {
    if(usuarioSelecionado == ''){
      alert("Por favor selecione um usuario");
      return;
    }
    const payload = {
      idUsuario: usuarioSelecionado,
      idModeloTreino: treinoSelecionado.id,
    };
    try {
      await vincularUsuarioTreino(payload);
      alert("Treino vinculado com sucesso!");
    } catch (error) {
      alert("Erro ao salvar treino.");
    }
    setShowConfirmModal(false);
    setTreinoSelecionado(null);
  };

  const handleCancel = () => {
    console.log("Cancelado.");
    setShowConfirmModal(false);
    setTreinoSelecionado(null);
  };

  const buscaDadosUsuario = async (novoUsuarioId) => {
    try {
        const data = await buscarTodosModelos(novoUsuarioId === null ? usuarioSelecionado : novoUsuarioId);
        setTreinosVinculados(data);
    } catch (error) {
        console.error('Erro ao buscar treinos:', error);
    }
  }

  
  const treinosFiltrados = treinosDisponiveis.filter(t =>
    t.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const carregarUsuarios = async () => {
    if (!carregado) {
        try {
            const data = await buscarTodosUsuarios();
            setUsuarios(data);
            setCarregado(true);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* Campo para nome do treino geral */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <select
                value={usuarioSelecionado}
                onChange={(e) => {
                  const novoUsuarioId = e.target.value;
                  setUsuarioSelecionado(novoUsuarioId);
                  buscaDadosUsuario(novoUsuarioId);
                }}
                onFocus={carregarUsuarios}
                style={{ flex: 1, padding: '0.5rem' }}
                >
                <option value="">Selecione um usuário</option>
                {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                    {usuario.nome} - {usuario.email}
                    </option>
                ))}
            </select>
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Quadro 1: Treinos disponíveis */}
        <div style={{ flex: 1 }}>
          <h2>Modelos de Treinos Disponíveis</h2>
          <input
            type="text"
            placeholder="Buscar treino..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
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
                <TreinoCard key={treino.id} treino={treino} onClick={() => { setTreinoSelecionado(treino);  setShowConfirmModal(true);  }} />
            ))}
            <ConfirmModal
              isOpen={showConfirmModal}
              title="Desaja vincular o treino ao usuario selecionado?"
              message="Deseja continuar?"
              onConfirm={handleVincular}
              onCancel={handleCancel}
            />
            </div>
        </div>

        {/* Quadro 2: Treinos Vinculados por dia */}
        <div style={{ flex: 1 }}>
          <h2>Treinos Vinculados</h2>

          {/* Botões dos dias */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            {treinosVinculados.map((treino, idx) => (
              <TreinoCard key={treino.id} treino={treino} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VinculoUsuario;