import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dadosMock from '../../dadosMock.json';

export default function Logs() {
  const [filtro, setFiltro] = useState('');

  // Filtra as linhas de log de acordo com o texto digitado
  const logsFiltrados = dadosMock.linhasDoTerminal.filter(item => 
    item.ip.includes(filtro) || item.payload.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      {/* SEÇÃO DO TÍTULO PRINCIPAL */}
      <View style={styles.headerRow}>
        <Text style={styles.tituloPagina}>Investigação de Logs Brutos</Text>
        <Text style={styles.subTituloPagina}>Payload / Auditoria de Eventos</Text>
      </View>

      {/* 1. GRADE DE CARDS SUPERIORES */}
      <View style={styles.gridCards}>
        <View style={styles.cardLog}>
          <Text style={styles.cardLabel}>Scans detectados</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasLogs.scans}</Text>
        </View>

        <View style={styles.cardLog}>
          <Text style={styles.cardLabel}>Portas varridas</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasLogs.portas}</Text>
        </View>

        <View style={styles.cardLog}>
          <Text style={styles.cardLabel}>IPs sob análise</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasLogs.ips}</Text>
        </View>

        <View style={styles.cardLog}>
          <Text style={styles.cardLabel}>Linhas de log</Text>
          <Text style={styles.cardValor}>{dadosMock.metricasLogs.linhas}</Text>
        </View>
      </View>

      {/* 2. ÁREA DE CONSOLE E BUSCA */}
      <View style={styles.consoleContainerCard}>
        <View style={styles.consoleHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Feather name="terminal" size={14} color="#00d2ff" style={{ marginRight: 6 }} />
            <Text style={styles.consoleTitle}>Console de Captura (Scapy)</Text>
          </View>
          
          <View style={styles.searchBarBox}>
            <Feather name="search" size={12} color="#55657e" style={{ marginRight: 6 }} />
            <TextInput
              style={styles.inputSearch}
              placeholder="filtrar por IP, porta, flag..."
              placeholderTextColor="#55657e"
              value={filtro}
              onChangeText={setFiltro}
            />
          </View>
        </View>

        {/* Caixa Preta do Terminal com rolagem dupla */}
        <View style={styles.caixaPretaTerminal}>
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View>
              {logsFiltrados.map((log, index) => (
                <View key={index} style={styles.linhaDeLogTexto}>
                  <Text style={styles.logTimestamp}>{log.time}</Text>
                  <Text style={styles.logTagInfo}> INFO </Text>
                  <Text style={styles.logIpOrigem}>{log.ip}</Text>
                  <Text style={styles.logPayloadTexto}> {log.payload}</Text>
                </View>
              ))}
              {logsFiltrados.length === 0 && (
                <Text style={{ color: '#55657e', fontSize: 11, fontStyle: 'italic', padding: 8 }}>
                  Nenhum registro encontrado.
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>

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
    fontSize: 14,
    fontWeight: 'bold',
  },
  subTituloPagina: {
    color: '#55657e',
    fontSize: 11,
    marginTop: 1,
  },
  gridCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLog: {
    width: '48%',
    backgroundColor: 'rgba(16, 22, 39, 0.6)',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  cardLabel: {
    color: '#55657e',
    fontSize: 10,
    fontWeight: '500',
  },
  cardValor: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  consoleContainerCard: {
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  consoleHeaderRow: {
    borderBottomWidth: 1,
    borderColor: '#161f30',
    paddingBottom: 12,
    marginBottom: 12,
  },
  consoleTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#1f2937',
    borderRadius: 6,
    paddingHorizontal: 10,
    height: 32,
  },
  inputSearch: {
    flex: 1,
    color: '#ffffff',
    fontSize: 11,
  },
  caixaPretaTerminal: {
    backgroundColor: '#05070c',
    borderRadius: 6,
    padding: 10,
    minHeight: 200,
  },
  linhaDeLogTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  logTimestamp: {
    color: '#6b7280',
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  logTagInfo: {
    color: '#00d2ff',
    fontSize: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    marginHorizontal: 8,
    borderRadius: 3,
  },
  logIpOrigem: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  logPayloadTexto: {
    color: '#e5e7eb',
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});