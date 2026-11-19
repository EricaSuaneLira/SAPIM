import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Importa os dados unificados do banco de dados na raiz
import dadosMock from '../../dadosMock.json';
// Importa o componente do modal flutuante 
import InserirAtivos from './inserirAtivos';

export default function Ativos() {
  // Estado para controlar a abertura e fechamento do modal flutuante
  const [modalVisivel, setModalVisivel] = useState(false);
  
  // Função auxiliar para definir a cor do status na interface mobile
  const obterCorStatus = (status: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'alerta': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#ffffff';
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      {/* SEÇÃO DO TÍTULO E BOTÃO DE INSERÇÃO */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={styles.tituloPagina}>Controle de Ativos</Text>
          <Text style={styles.subTituloPagina}>Dispositivos Monitorados</Text>
        </View>
        <TouchableOpacity 
          style={styles.botaoInserir}
          activeOpacity={0.8}
          onPress={() => setModalVisivel(true)} // Abre o modal flutuante ao clicar
        >
          <Feather name="plus" size={14} color="#0a0f1d" style={{ marginRight: 4 }} />
          <Text style={styles.textoBotaoInserir}>Inserir ativo</Text>
        </TouchableOpacity>
      </View>

      {/* 1. GRADE DE 4 CARDS SUPERIORES DE METRICAS */}
      <View style={styles.gridCards}>
        {/* Total */}
        <View style={styles.cardStatus}>
          <Text style={styles.cardLabel}>Total de ativos</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasAtivos.total}</Text>
        </View>

        {/* Online */}
        <View style={styles.cardStatus}>
          <Text style={styles.cardLabel}>Online</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasAtivos.online}</Text>
          <Text style={[styles.cardSubLabel, { color: '#10b981' }]}>● operacional</Text>
        </View>

        {/* Em Alerta */}
        <View style={styles.cardStatus}>
          <Text style={styles.cardLabel}>Em alerta</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasAtivos.alerta}</Text>
          <Text style={[styles.cardSubLabel, { color: '#f59e0b' }]}>● requer atenção</Text>
        </View>

        {/* Offline */}
        <View style={styles.cardStatus}>
          <Text style={styles.cardLabel}>Offline</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasAtivos.offline}</Text>
        </View>
      </View>

      {/* 2. CONTAINER DO INVENTÁRIO DE ATIVOS */}
      <View style={styles.inventarioCard}>
        <View style={styles.inventarioHeader}>
          <Feather name="database" size={14} color="#00d2ff" style={{ marginRight: 8 }} />
          <Text style={styles.inventarioTitulo}>Inventário de Ativos</Text>
        </View>

        {/* Mapeamento de cada ativo simulando as linhas da tabela da Web */}
        {dadosMock.inventarioAtivos.map((ativo, index) => (
          <View key={index} style={styles.itemAtivoCard}>
            <View style={styles.ativoLinhaPrincipal}>
              <Text style={styles.ativoNome}>{ativo.nome}</Text>
              <View style={styles.statusBadgeRow}>
                <View style={[styles.statusDot, { backgroundColor: obterCorStatus(ativo.status) }]} />
                <Text style={[styles.statusTexto, { color: obterCorStatus(ativo.status) }]}>{ativo.status}</Text>
              </View>
            </View>

            <View style={styles.ativoDetalhesGrid}>
              <View style={styles.detalheColuna}>
                <Text style={styles.detalheLabel}>ENDEREÇO IP</Text>
                <Text style={styles.detalheValorIP}>{ativo.ip}</Text>
              </View>
              <View style={styles.detalheColuna}>
                <Text style={styles.detalheLabel}>TIPO</Text>
                <Text style={styles.detalheValorGeral}>{ativo.tipo}</Text>
              </View>
              <View style={[styles.detalheColuna, { alignItems: 'flex-end' }]}>
                <Text style={styles.detalheLabel}>SCANS HOJE</Text>
                <Text style={styles.detalheValorGeral}>{ativo.scans}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
      {/* COMPONENTE DO MODAL FLUTUANTE DE INSERÇÃO */}
      <InserirAtivos 
        visivel={modalVisivel} 
        onFechar={() => setModalVisivel(false)} 
        onSalvar={(nome, ip, tipo) => {
          console.log('Inclusão realizada no inventário:', { nome, ip, tipo });
          setModalVisivel(false); // Fecha o modal após simular o salvamento
        }}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070a13',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 4,
  },
  tituloPagina: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subTituloPagina: {
    color: '#55657e',
    fontSize: 12,
    marginTop: 1,
  },
  botaoInserir: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00d2ff',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  textoBotaoInserir: {
    color: '#0a0f1d',
    fontSize: 11,
    fontWeight: 'bold',
  },
  gridCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardStatus: {
    width: '48%',
    backgroundColor: 'rgba(16, 22, 39, 0.6)',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 75,
    justifyContent: 'center',
  },
  cardLabel: {
    color: '#55657e',
    fontSize: 10,
    fontWeight: '500',
  },
  cardValor: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 2,
  },
  cardSubLabel: {
    fontSize: 9,
    fontWeight: '500',
    marginTop: 4,
  },
  inventarioCard: {
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  inventarioHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#161f30',
    paddingBottom: 12,
    marginBottom: 8,
  },
  inventarioTitulo: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  itemAtivoCard: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#161f30',
  },
  ativoLinhaPrincipal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  ativoNome: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  ativoDetalhesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detalheColuna: {
    flex: 1,
  },
  detalheLabel: {
    color: '#55657e',
    fontSize: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  detalheValorIP: {
    color: '#00d2ff',
    fontSize: 11,
    fontWeight: '600',
  },
  detalheValorGeral: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '500',
  },
});
