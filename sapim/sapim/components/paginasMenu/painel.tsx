import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dadosMock from '../../dadosMock.json';
import InserirAtivos from './inserirAtivos';

export default function Painel() {

  const [modalVisivel, setModalVisivel] = useState(false);
  const [horaSelecionada, setHoraSelecionada] = useState<string | null>(null);

  return (
  <ScrollView 
    style={styles.container} 
    contentContainerStyle={styles.scrollContent}
    indicatorStyle="white" 
  >

      
      {/* SEÇÃO DO TÍTULO EXECUTIVO E BOTÃO INSERIR ATIVO */}
      <View style={styles.headerExecutivoRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.tituloExecutivo}>Painel Principal</Text>
          <Text style={styles.subTituloExecutivo}>Visão Geral Executiva</Text>
        </View>
        <TouchableOpacity 
          style={styles.botaoInserirAtivo}
          activeOpacity={0.8}
          onPress={() => setModalVisivel(true)} 
        >
          <Feather name="plus" size={14} color="#0a0f1d" style={{ marginRight: 4 }} />
          <Text style={styles.textoBotaoInserir}>Inserir ativo</Text>
        </TouchableOpacity>
      </View>

      {/* 1. GRADE DE CARDS ATUALIZADA IGUAL À WEB */}
      <View style={styles.gridCards}>
        {/* Card 1: Ativos Monitorados */}
        <View style={styles.cardMetrica}>
          <Text style={styles.cardLabelTop}>Ativos monitorados</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasGerais.ativosMonitorados}</Text>
          <Text style={[styles.cardSubLabel, { color: '#00d2ff' }]}>{dadosMock.metricasGerais.ativosNovos}</Text>
        </View>

        {/* Card 2: Scans Detectados */}
        <View style={styles.cardMetrica}>
          <Text style={styles.cardLabelTop}>Scans detectados</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasGerais.scansDetectados}</Text>
          <Text style={[styles.cardSubLabel, { color: '#ef4444' }]}>{dadosMock.metricasGerais.scansSub}</Text>
        </View>

        {/* Card 3: Portas Varridas */}
        <View style={styles.cardMetrica}>
          <Text style={styles.cardLabelTop}>Portas varridas</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasGerais.portasVarridas}</Text>
          <Text style={styles.cardSubLabel}>{dadosMock.metricasGerais.portasSub}</Text>
        </View>

        {/* Card 4: IPs Únicos */}
        <View style={styles.cardMetrica}>
          <Text style={styles.cardLabelTop}>IPs únicos</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasGerais.ipsUnicos}</Text>
          <Text style={[styles.cardSubLabel, { color: '#f59e0b' }]}>{dadosMock.metricasGerais.ipsSub}</Text>
        </View>
      </View>

      {/* 2. GRÁFICO DE TRÁFEGO DE REDE */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="trending-up" size={14} color="#00d2ff" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>Tráfego de Rede — tempo real</Text>
        </View>

        <View style={styles.graficoLinhaArea}>
          {dadosMock.graficoLinhaTrafego.map((item, index) => (
            <View key={index} style={styles.colunaLinhaGrafico}>
              <View style={[styles.pontoLinha, { height: `${item.nivel * 11}%` }]}>
                <View style={styles.pontoBolinhaAzul} />
              </View>
              <Text style={styles.eixoXTexto}>{item.tempo.substring(3)}</Text>
            </View>
          ))}
        </View>
      </View>
      {/* 3. GRÁFICO DE TIPOS DE SCAN DETECTADOS */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="activity" size={14} color="#00d2ff" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>Tipos de Scan Detectados</Text>
        </View>

        <View style={styles.donutContainerMobile}>
          <View style={styles.roscaExterna}>
            <View style={[styles.roscaParte, { backgroundColor: '#00d2ff', transform: [{ rotate: '0deg' }] }]} />
            <View style={[styles.roscaParteVerde, { backgroundColor: '#10b981' }]} />
            <View style={styles.roscaMioloEscuro}>
              <Text style={styles.textoTotalScans}>{dadosMock.tiposScan.total}</Text>
              <Text style={styles.subTextoTotalScans}>Scans</Text>
            </View>
          </View>

          <View style={styles.legendasDonut}>
            <View style={styles.legendaDonutItem}>
              <View style={[styles.statusDot, { backgroundColor: '#00d2ff' }]} />
              <Text style={styles.legendaDonutTexto}>UDP ({dadosMock.tiposScan.udp.qtd})</Text>
            </View>
            <View style={styles.legendaDonutItem}>
              <View style={[styles.statusDot, { backgroundColor: '#10b981' }]} />
              <Text style={styles.legendaDonutTexto}>TCP ({dadosMock.tiposScan.tcp.qtd})</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 4. SEÇÃO ALERTAS RECENTES */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeaderRow}>
          <Feather name="bell" size={14} color="#00d2ff" style={{ marginRight: 6 }} />
          <Text style={styles.sectionTitle}>Alertas Recentes — origem → destino</Text>
        </View>

        <View style={styles.listaAlertas}>
          {dadosMock.alertasRecentes.map((alerta) => (
            <View key={alerta.id} style={styles.itemAlerta}>
              <View style={[styles.statusDot, { backgroundColor: alerta.cor, marginTop: 5 }]} />
              <View style={styles.alertaDados}>
                <Text style={styles.alertaTitulo}>{alerta.titulo}</Text>
                <Text style={styles.alertaIp}>{alerta.ip}</Text>
              </View>
              <Text style={styles.alertaTempo}>{alerta.tempo}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* COMPONENTE DO MODAL FLUTUANTE DE INSERÇÃO */}
      <InserirAtivos 
        visivel={modalVisivel} 
        onFechar={() => setModalVisivel(false)} 
        onSalvar={(nome, ip, tipo) => {
          console.log('Inclusão realizada:', { nome, ip, tipo });
          setModalVisivel(false); 
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
  headerExecutivoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 4,
  },
  tituloExecutivo: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  subTituloExecutivo: {
    color: '#55657e',
    fontSize: 12,
    marginTop: 1,
  },
  botaoInserirAtivo: {
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
  cardMetrica: {
    width: '48%',
    backgroundColor: 'rgba(16, 22, 39, 0.6)',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  cardLabelTop: {
    color: '#55657e',
    fontSize: 10,
    fontWeight: '500',
  },
  cardValor: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cardSubLabel: {
    color: '#55657e',
    fontSize: 9,
    fontWeight: '500',
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
  graficoLinhaArea: {
    height: 130,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: 'rgba(85, 101, 126, 0.2)',
    paddingBottom: 4,
  },
  colunaLinhaGrafico: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  pontoLinha: {
    width: 2,
    backgroundColor: 'rgba(0, 210, 255, 0.2)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  pontoBolinhaAzul: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00d2ff',
  },
  eixoXTexto: {
    color: '#55657e',
    fontSize: 8,
    marginTop: 6,
  },
  donutContainerMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  roscaExterna: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  roscaParte: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  roscaParteVerde: {
    position: 'absolute',
    width: 30,
    height: 30,
    bottom: 10,
    right: 10,
    borderRadius: 15,
  },
  roscaMioloEscuro: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#0a0f1d',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  textoTotalScans: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTextoTotalScans: {
    color: '#55657e',
    fontSize: 9,
  },
  legendasDonut: {
    justifyContent: 'center',
  },
  legendaDonutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendaDonutTexto: {
    color: '#ffffff',
    fontSize: 11,
    marginLeft: 8,
    fontWeight: '500',
  },
  listaAlertas: {
    marginTop: 2,
  },
  itemAlerta: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#161f30',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  alertaDados: {
    flex: 1,
    paddingHorizontal: 12,
  },
  alertaTitulo: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  alertaIp: {
    color: '#55657e',
    fontSize: 9,
    marginTop: 2,
  },
  alertaTempo: {
    color: '#55657e',
    fontSize: 10,
  },
});
