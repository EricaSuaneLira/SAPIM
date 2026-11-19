import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dadosMock from '../../dadosMock.json';

export default function GuiaPortas() {
  const [busca, setBusca] = useState('');

  // Função auxiliar para definir cores de severidade
  const obterCorCrit = (crit: string) => {
    switch (crit) {
      case 'critico': return '#ef4444';
      case 'medio': return '#3b82f6';
      case 'baixo': return '#10b981';
      default: return '#55657e';
    }
  };

  // Filtra as portas de acordo com o número ou nome do serviço digitado
  const portasFiltradas = dadosMock.guiadePortas.filter(porta => 
    porta.numero.includes(busca) || porta.servico.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      
      {/* TÍTULO PRINCIPAL */}
      <View style={styles.headerRow}>
        <Text style={styles.tituloPagina}>Guia Educacional de Portas</Text>
      </View>

      {/* BANNER AZUL DE INFORMAÇÃO SUPERIOR */}
      <View style={styles.bannerInformativo}>
        <Feather name="shield" size={24} color="#ffffff" style={{ marginRight: 12, marginTop: 2 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitulo}>Entenda cada porta</Text>
          <Text style={styles.bannerDesc}>
            O que é o serviço, por que é um alvo comum e como se proteger. Material educacional do SAPIM.
          </Text>
        </View>
      </View>

      {/* BARRA DE BUSCA INTERATIVA */}
      <View style={styles.searchBarBox}>
        <Feather name="search" size={14} color="#55657e" style={{ marginRight: 8 }} />
        <TextInput
          style={styles.inputSearch}
          placeholder="Buscar por número de porta ou serviço..."
          placeholderTextColor="#55657e"
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* GRID DE CARDS DE PORTAS EM FORMATO RESPONSIVO (2 COLUNAS) */}
      <View style={styles.gridPortas}>
        {portasFiltradas.map((item, index) => (
          <View key={index} style={styles.cardPorta}>
            
            {/* Linha Superior do Card: Número e Serviço */}
            <View style={styles.cardHeaderRow}>
              <Text style={styles.portaNumero}>{item.numero}</Text>
              <Text style={styles.portaServico}>{item.servico}</Text>
            </View>

            {/* Descrição do serviço */}
            <Text style={styles.portaDescText} numberOfLines={4}>
              {item.desc}
            </Text>

            {/* Badge de Criticidade */}
            <View style={styles.badgeContainer}>
              <View style={[styles.badgeBg, { backgroundColor: 'rgba(255, 255, 255, 0.04)' }]}>
                <View style={[styles.badgeDot, { backgroundColor: obterCorCrit(item.crit) }]} />
                <Text style={[styles.badgeText, { color: obterCorCrit(item.crit) }]}>{item.crit}</Text>
              </View>
            </View>

            {/* Rodapé do Card com dica de mitigação (Box Verde) */}
            <View style={styles.dicaBoxContainer}>
              <Feather name="check-circle" size={10} color="#10b981" style={{ marginRight: 4, marginTop: 1 }} />
              <Text style={styles.dicaTexto} numberOfLines={2}>{item.dica}</Text>
            </View>

          </View>
        ))}
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
    marginBottom: 14,
    marginTop: 4,
  },
  tituloPagina: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  bannerInformativo: {
    flexDirection: 'row',
    backgroundColor: '#2563eb', 
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  bannerTitulo: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bannerDesc: {
    color: '#bfdbfe',
    fontSize: 10,
    lineHeight: 14,
  },
  searchBarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 38,
    marginBottom: 16,
  },
  inputSearch: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
  },
  gridPortas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardPorta: {
    width: '48%', 
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 160,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  portaNumero: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  portaServico: {
    color: '#00d2ff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  portaDescText: {
    color: '#55657e',
    fontSize: 10,
    lineHeight: 13,
    marginBottom: 8,
  },
  badgeContainer: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  badgeBg: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  dicaBoxContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(16, 185, 129, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 4,
    padding: 6,
    alignItems: 'flex-start',
  },
  dicaTexto: {
    color: '#10b981',
    fontSize: 9,
    lineHeight: 11,
    flex: 1,
  },
});
