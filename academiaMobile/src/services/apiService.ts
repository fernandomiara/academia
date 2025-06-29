export async function fetchTreinoSemanal(idAluno: number, idProfessor: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/academia/aulas/${idAluno}/${idProfessor}`);
    if (!response.ok) throw new Error('Erro ao buscar treino');
    const data = await response.json();
    return data; // estrutura: { 0: [...], 1: [...], ..., 6: [...] }
  } catch (error) {
    console.error('Erro ao buscar treino semanal:', error);
    return {};
  }
}