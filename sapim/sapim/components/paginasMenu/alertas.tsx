import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Importa os dados simulados baseados na versão Web
import dadosMock from '../../dadosMock.json';
// Importa a nova tela de detalhe individual que você acabou de criar
import DetalheAlerta from './detalheAlerta';

// Definição da estrutura de dados para tipagem do alerta selecionado
interface AlertaItem {
  id: string;
  origem: string;
  destino: string;
  tipo: string;
  desc: string;
  time: string;
}

export default function Alertas() {
  // Estados para controlar a abertura da tela de detalhes e qual alerta foi clicado
  const [detalheVisivel, setDetalheVisivel] = useState(false);
  const [alertaSelecionado, setAlertaSelecionado] = useState<AlertaItem | null>(null);
  
  // Função auxiliar para definir a cor correspondente de cada gravidade
  const obterCorGravidade = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'crítico': case 'critico': return '#ef4444';
      case 'alto': return '#f59e0b';
      case 'médio': case 'medio': return '#3b82f6';
      case 'baixo': return '#10b981';
      default: return '#55657e';
    }
  };

  // Abre a tela de inspeção carregando os dados do item selecionado
  const abrirInspeçãoAlerta = (alerta: AlertaItem) => {
    setAlertaSelecionado(alerta);
    setDetalheVisivel(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      {/* SEÇÃO DO TÍTULO PRINCIPAL */}
      <View style={styles.headerRow}>
        <Text style={styles.tituloPagina}>Central de Alertas</Text>
        <Text style={styles.subTituloPagina}>Notificações em Tempo Real</Text>
      </View>

      {/* 1. GRADE DE 4 CARDS SUPERIORES */}
      <View style={styles.gridCards}>
        {/* Críticos */}
        <View style={styles.cardGravidade}>
          <Text style={styles.cardLabel}>Críticos</Text>
          <Text style={styles.cardValor}>{dadosMock.centralAlertas.criticos}</Text>
          <Text style={[styles.cardSubLabel, { color: '#ef4444' }]}>ação imediata</Text>
        </View>

        {/* Altos */}
        <View style={styles.cardGravidade}>
          <Text style={styles.cardLabel}>Altos</Text>
          <Text style={styles.cardValor}>{dadosMock.centralAlertas.altos}</Text>
        </View>

        {/* Médios */}
        <View style={styles.cardGravidade}>
          <Text style={styles.cardLabel}>Médios</Text>
          <Text style={styles.cardValor}>{dadosMock.centralAlertas.medios}</Text>
        </View>

        {/* Baixos */}
        <View style={styles.cardGravidade}>
          <Text style={styles.cardLabel}>Baixos</Text>
          <Text style={styles.cardValor}>{dadosMock.centralAlertas.baixos}</Text>
        </View>
      </View>

      {/* 2. GRÁFICO DA LINHA DO TEMPO SIMULADO */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="clock" size={14} color="#3b82f6" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>Linha do Tempo de Detecção (tempo real)</Text>
        </View>

        <View style={styles.graficoCronologicoArea}>
          <View style={styles.linhaHorizontalGrafico} />
          <View style={styles.eixoXDatasRow}>
            <Text style={styles.textoEixoX}>01:51:05</Text>
            <Text style={styles.textoEixoX}>01:51:38</Text>
            <Text style={styles.textoEixoX}>01:52:11</Text>
            <Text style={styles.textoEixoX}>01:52:57</Text>
          </View>
        </View>
      </View>
      {/* 3. LISTA DE ALERTAS RECENTES */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="alert-circle" size={14} color="#00d2ff" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>Alertas Recentes — origem → destino</Text>
        </View>

        {dadosMock.listaCentralAlertas.map((item, index) => (
          <View key={index} style={styles.itemAlertaTabelaCard}>
            
            {/* Linha de Fluxo de IP */}
            <View style={styles.fluxoIpRow}>
              <View style={styles.ipBloco}>
                <Text style={styles.ipLabel}>ORIGEM</Text>
                <Text style={styles.ipTextoValue}>{item.origem}</Text>
              </View>
              <Feather name="arrow-right" size={14} color="#55657e" style={{ marginHorizontal: 12, marginTop: 12 }} />
              <View style={styles.ipBloco}>
                <Text style={styles.ipLabel}>DESTINO</Text>
                <Text style={styles.ipTextoValue}>{item.destino}</Text>
              </View>
            </View>

            {/* Rodapé Técnico do Card com ativação do clique do olho */}
            <View style={styles.alertaRodapeInfoGrid}>
              <View style={{ flex: 1 }}>
                <Text style={styles.descTecnicaTexto}>{item.desc}</Text>
                <Text style={styles.timestampTexto}>{item.time}</Text>
              </View>

              <View style={styles.badgeAlertaContainer}>
                <View style={[styles.badgeBg, { backgroundColor: 'rgba(255, 255, 255, 0.03)' }]}>
                  <View style={[styles.statusDot, { backgroundColor: obterCorGravidade(item.tipo) }]} />
                  <Text style={[styles.badgeLabelText, { color: obterCorGravidade(item.tipo) }]}>{item.tipo}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.botaoOlhoInspeção} 
                  activeOpacity={0.7}
                  onPress={() => abrirInspeçãoAlerta(item)} 
                >
                  <Feather name="eye" size={14} color="#00d2ff" />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        ))}
      </View>

      {/* COMPONENTE EXCLUSIVO: TELA DE DETALHE INDIVIDUAL DO CASO */}
      <DetalheAlerta
        visivel={detalheVisivel}
        onFechar={() => setDetalheVisivel(false)}
        dadosAlerta={alertaSelecionado}
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
  gridCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardGravidade: {
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
  sectionCard: {
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  graficoCronologicoArea: {
    height: 60,
    justifyContent: 'center',
    paddingTop: 10,
  },
  linhaHorizontalGrafico: {
    height: 2,
    backgroundColor: '#ef4444',
    width: '100%',
  },
  eixoXDatasRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  textoEixoX: {
    color: '#55657e',
    fontSize: 8,
  },
  itemAlertaTabelaCard: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#161f30',
  },
  fluxoIpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#070a13',
    padding: 8,
    borderRadius: 6,
  },
  ipBloco: {
    flex: 1,
  },
  ipLabel: {
    color: '#55657e',
    fontSize: 8,
    fontWeight: '600',
    marginBottom: 2,
  },
  ipTextoValue: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  alertaRodapeInfoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  descTecnicaTexto: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '500',
  },
  timestampTexto: {
    color: '#55657e',
    fontSize: 9,
    marginTop: 3,
  },
  badgeAlertaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeBg: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 12,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 4,
  },
  badgeLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  botaoOlhoInspeção: {
    padding: 4,
  },
});
