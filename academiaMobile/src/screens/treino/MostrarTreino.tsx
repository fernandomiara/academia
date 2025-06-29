import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';
import ComboSelect from '../../components/ComboSelect';
import { fetchTreinoSemanal } from '../../services/apiService';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import MenuUsuario from '../../components/MenuUsuario';

// Dias da semana
const diasLabel = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Simulando treino semanal (como se fosse da academia ID = "1")
const treinoSemanal = {
  domingo: [],
  segunda: [
    { titulo: "Supino Inclinado", repeticao: 12, quantidade: 4, concluido: true },
    { titulo: "Supino Reto", repeticao: 12, quantidade: 4, concluido: true },
    { titulo: "Crucifixo", repeticao: 12, quantidade: 4, concluido: true },
    { titulo: "Supino Declinado", repeticao: 12, quantidade: 4, concluido: true },
  ],
  terca: [
    { titulo: "Agachamento", repeticao: 12, quantidade: 4, concluido: false },
    { titulo: "Mesa abdutora", repeticao: 12, quantidade: 4, concluido: false },
    { titulo: "Mesa extensora", repeticao: 12, quantidade: 4, concluido: false },
    { titulo: "Chute voadora", repeticao: 12, quantidade: 4, concluido: false },
  ],
  quarta: [],
  quinta: [],
  sexta: [],
  sabado: []
};

// Mock de academias (apenas para o Picker)
const academiasMock = [
  { id: '1', nome: 'Academia Alpha' },
  { id: '2', nome: 'Academia Beta' },
  { id: '3', nome: 'Academia StrongFit' }
];

export default function MostrarTreinoScreen() {
  const [diaSelecionado, setDiaSelecionado] = useState<number>(0);
  const [academiaSelecionada, setAcademiaSelecionada] = useState<string>('1');
  const [treinosDoDia, setTreinosDoDia] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
  const [treinoSemanal, setTreinoSemanal] = useState<{ [key: number]: any[] }>({});

  useEffect(() => {
    const hoje = new Date().getDay(); // 0 = domingo
    setDiaSelecionado(hoje);
  }, []);

useEffect(() => {
  const carregarTreino = async () => {
    const dados = await fetchTreinoSemanal(1, parseInt(academiaSelecionada));
    setTreinoSemanal(dados);

    const treinos = dados[diaSelecionado] || [];
    setTreinosDoDia(treinos);
    setCheckboxStates(new Array(treinos.length).fill(false));
  };

  carregarTreino();
}, [diaSelecionado, academiaSelecionada]);


  const renderDiaBotao = (dia: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.diaBotao,
        diaSelecionado === index && styles.diaSelecionado
      ]}
      onPress={() => setDiaSelecionado(index)}
    >
      <Text
        style={[
          styles.diaTexto,
          diaSelecionado === index && styles.diaTextoSelecionado
        ]}
      >
        {dia}
      </Text>
    </TouchableOpacity>
  );

const todosJaConcluidos = treinosDoDia.every(item => item.concluido === true || !item.titulo);

const todosMarcadosOuConcluidos = treinosDoDia.every((item, index) => {
  if (!item.titulo) return true;
  return item.concluido === true || checkboxStates[index];
});

const podeFinalizar = !todosJaConcluidos && todosMarcadosOuConcluidos;

const abrirVideo = (item) => {
  alert('Por Razões de direito de imagem o video antigo foi retirando, os videos novos estão sendos gravados');
  // ou abrir link com Linking.openURL('https://youtube.com/...')
};
const renderTreinoCard = ({ item, index }: any) => {
  // Ignora elementos inválidos
  if (!item.titulo) return null;

  const isItemConcluido = item.concluido === true;
  const isDisabled = isItemConcluido;

  return (
    <View style={styles.cardWrapper}>
      <View style={[styles.card, isDisabled && { opacity: 0.5 }]}>
        <View style={styles.cardRow}>
          <View style={styles.colunaEsquerda}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Text style={styles.cardInfo}>Séries: {item.serie}</Text>
            <Text style={styles.cardInfo}>Repetições: {item.repeticao}</Text>
          </View>

          <View style={styles.colunaDireita}>
            <TouchableOpacity onPress={() => abrirVideo(item)} style={styles.botaoVideo}>
              <FontAwesome name="play" size={16} color="#fff" />
            </TouchableOpacity>
            <Checkbox
              style={styles.checkbox}
              value={isItemConcluido || checkboxStates[index]}
              disabled={isDisabled}
              onValueChange={(newValue) => {
                const updatedStates = [...checkboxStates];
                updatedStates[index] = newValue;
                setCheckboxStates(updatedStates);
              }}
            />
          </View>
        </View>
      </View>
      <View style={styles.cardLinhaAzul} />
    </View>
  );
};


  return (
    <LinearGradient
      colors={['#B0E0E6', '#ffffff']}
      locations={[0, 2.5]}
      style={styles.container}
    >
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Meu Treino</Text>
        <MenuUsuario />
      </View>

      {/* Picker de academia */}
      <View style={styles.pickerWrapper}>
        <ComboSelect
          label="Selecione a academia:"
          selectedValue={academiaSelecionada}
          onValueChange={setAcademiaSelecionada}
          options={academiasMock.map((a) => ({ label: a.nome, value: a.id }))}
        />
      </View>

      {/* Abas dos dias da semana */}
      <View style={styles.diasContainer}>
        {diasLabel.map((dia, index) => renderDiaBotao(dia, index))}
      </View>

      {/* Lista de treinos do dia */}
      <FlatList
        data={treinosDoDia}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderTreinoCard}
        contentContainerStyle={styles.listaTreinos}
        ListEmptyComponent={
          <Text style={styles.semTreinoTexto}>Sem treino para este dia.</Text>
        }
      />

      {treinosDoDia.length > 0 && (
        <TouchableOpacity
          style={[
            styles.botaoFinalizar,
            {
              backgroundColor: podeFinalizar ? '#28a745' : '#ccc'
            }
          ]}
          onPress={() => alert('Parabéns! Você ganhou 10 pontos 🎉')}
          disabled={!podeFinalizar}
        >
          <Text style={styles.botaoTexto}>
            {todosJaConcluidos
              ? 'Treino já finalizado'
              : podeFinalizar
              ? 'Finalizar e ganhar 10 pontos'
              : 'Conclua todos os exercícios'}
          </Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 4
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 2,
    marginBottom: 12,
    overflow: 'hidden',
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  picker: {
    height: 44,
    width: '100%'
  },
  diasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#DCDCDC',
  },
  diaBotao: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 2
  },
  diaSelecionado: {
    backgroundColor: '#2e86de'
  },
  diaTexto: {
    fontSize: 16,
    color: '#333'
  },
  diaTextoSelecionado: {
    color: '#fff',
    fontWeight: 'bold'
  },
  listaTreinos: {
    paddingVertical: 10
  },
  card: {
    backgroundColor: '#DCDCDC',
    padding: 16,
    marginBottom: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 }, // Direita e embaixo
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardInfo: {
    fontSize: 16,
    marginTop: 4
  },
  semTreinoTexto: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 20
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colunaEsquerda: {
    flex: 3,
  },
  colunaDireita: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
  },
  botaoFinalizar: {
  padding: 16,
  borderRadius: 2,
  alignItems: 'center',
  marginVertical: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 4,
  elevation: 5,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardLinhaAzul: {
    height: 10,
    backgroundColor: '#2e86de', // azul
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    marginTop: -20
  },
  cardWrapper: {
    marginBottom: 10, // mantém espaçamento entre os cards
  },
  botaoVideo: {
    width: 32,
    height: 32,
    backgroundColor: '#2e86de', // Azul
    borderRadius: 6, // Canto levemente arredondado
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});