import React from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface DetalheAlertaProps {
  visivel: boolean;
  onFechar: () => void;
  dadosAlerta: {
    origem: string;
    destino: string;
    tipo: string;
    desc: string;
    time: string;
  } | null;
}

export default function DetalheAlerta({ visivel, onFechar, dadosAlerta }: DetalheAlertaProps) {
  if (!dadosAlerta) return null;

  // Lista simulada de portas varridas
  const portasSimuladas = [
    { num: '1900', sensivel: false }, { num: '32821', sensivel: false }, { num: '33984', sensivel: false },
    { num: '34562', sensivel: false }, { num: '34786', sensivel: false }, { num: '35486', sensivel: false },
    { num: '35944', sensivel: false }, { num: '36761', sensivel: false }, { num: '36821', sensivel: false },
    { num: '37368', sensivel: false }, { num: '37471', sensivel: false }, { num: '37577', sensivel: false },
    { num: '39262', sensivel: false }, { num: '39583', sensivel: false }, { num: '40835', sensivel: true },
    { num: '41344', sensivel: false }, { num: '42113', sensivel: false }, { num: '42304', sensivel: false },
    { num: '42552', sensivel: false }, { num: '43215', sensivel: false }, { num: '43815', sensivel: false },
    { num: '44658', sensivel: false }, { num: '45271', sensivel: false }, { num: '45874', sensivel: false },
    { num: '46059', sensivel: false }, { num: '46688', sensivel: false }, { num: '46978', sensivel: false },
    { num: '47838', sensivel: false }, { num: '48190', sensivel: false }
  ];

  return (
    <Modal animationType="slide" transparent={false} visible={visivel} onRequestClose={onFechar}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        {/* BOTÃO VOLTAR E CABEÇALHO */}
        <TouchableOpacity style={styles.btnVoltarRow} onPress={onFechar} activeOpacity={0.7}>
          <Feather name="chevron-left" size={16} color="#55657e" />
          <Text style={styles.textoBtnVoltar}>Voltar para a central</Text>
        </TouchableOpacity>

        <Text style={styles.tituloCaso}>Caso #9 — Análise individual do scan</Text>

        {/* BLOCO 1: DADOS DO EVENTO */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Feather name="activity" size={14} color="#38bdf8" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Dados do evento</Text>
          </View>

          <View style={styles.boxDestaqueIP}>
            <View style={styles.avatarIconAlerta}>
              <Feather name="alert-circle" size={16} color="#3b82f6" />
            </View>
            <View>
              <Text style={styles.textoDestaqueIP}>{dadosAlerta.origem}</Text>
              <Text style={styles.textoDestaqueData}>20/06/2026, {dadosAlerta.time}</Text>
            </View>
          </View>

          {/* Tabela de Propriedades */}
          <View style={styles.tabelaLinha}><Text style={styles.tabelaLabel}>IP de origem (atacante)</Text><Text style={styles.tabelaValorAzul}>{dadosAlerta.origem}</Text></View>
          <View style={styles.tabelaLinha}><Text style={styles.tabelaLabel}>IP de destino (alvo)</Text><Text style={styles.tabelaValorBR}>{dadosAlerta.destino}</Text></View>
          <View style={styles.tabelaLinha}><Text style={styles.tabelaLabel}>Tipo de scan</Text><Text style={styles.tabelaValorBR}>{dadosAlerta.desc}</Text></View>
          <View style={styles.tabelaLinha}><Text style={styles.tabelaLabel}>Portas varridas</Text><Text style={styles.tabelaValorBR}>26</Text></View>
          <View style={[styles.tabelaLinha, { borderBottomWidth: 0 }]}><Text style={styles.tabelaLabel}>Severidade</Text><Text style={styles.tabelaValorBR}>{dadosAlerta.tipo}</Text></View>
        </View>

        {/* BLOCO 2: ANÁLISE DA IA */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Feather name="cpu" size={14} color="#38bdf8" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Análise da IA</Text>
          </View>

          <View style={styles.badgeAmeaça}>
            <Text style={styles.textoBadgeAmeaça}>Ameaça: Moderado</Text>
          </View>

          <Text style={styles.textoAnaliseIA}>
            {dadosAlerta.origem} fez um {dadosAlerta.desc} em 26 portas — varredura de baixa intensidade observada pelo módulo preditivo.
          </Text>

          <Text style={styles.tituloPassos}>PRÓXIMOS PASSOS</Text>
          <View style={styles.linhaPassoItem}><Text style={styles.numeroPasso}>1</Text><Text style={styles.textoPasso}>Adicionar o IP à lista de observação</Text></View>
          <View style={styles.linhaPassoItem}><Text style={styles.numeroPasso}>2</Text><Text style={styles.textoPasso}>Acompanhar a evolução nas próximas horas</Text></View>
        </View>
        {/* BLOCO 3: PORTAS TENTADAS */}
        <View style={styles.sectionCard}>
          <View style={styles.cardHeaderRow}>
            <Feather name="lock" size={14} color="#38bdf8" style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Portas tentadas (46)</Text>
          </View>

          {/* Grade de Portas */}
          <View style={styles.gridPortasCaixas}>
            {portasSimuladas.map((porta, index) => (
              <View 
                key={index} 
                style={[styles.boxPortaItem, porta.sensivel && styles.boxPortaSensivel]}
              >
                <Text style={[styles.textoPortaItemNum, porta.sensivel && styles.textoPortaSensivel]}>
                  {porta.num}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.legendaSensivelRow}>
            <View style={styles.bolinhaVermelhaLegenda} />
            <Text style={styles.textoLegendaSensivel}>vermelho = porta de serviço sensível</Text>
          </View>
        </View>

      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070a13',
  },
  scrollContent: {
    padding: 16,
    paddingTop: 40, 
    paddingBottom: 40,
  },
  btnVoltarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBtnVoltar: {
    color: '#55657e',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
  },
  tituloCaso: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionCard: {
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#161f30',
    paddingBottom: 10,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  boxDestaqueIP: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarIconAlerta: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textoDestaqueIP: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textoDestaqueData: {
    color: '#55657e',
    fontSize: 10,
    marginTop: 2,
  },
  tabelaLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(22, 31, 48, 0.5)',
  },
  tabelaLabel: {
    color: '#55657e',
    fontSize: 11,
  },
  tabelaValorBR: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '500',
  },
  tabelaValorAzul: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '600',
  },
  badgeAmeaça: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  textoBadgeAmeaça: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: 'bold',
  },
  textoAnaliseIA: {
    color: '#9ca3af',
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 16,
  },
  tituloPassos: {
    color: '#55657e',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 10,
  },
  linhaPassoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  numeroPasso: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
    marginRight: 10,
  },
  textoPasso: {
    color: '#ffffff',
    fontSize: 11,
  },
  gridPortasCaixas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  boxPortaItem: {
    backgroundColor: '#111827',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
    minWidth: 42,
    alignItems: 'center',
  },
  boxPortaSensivel: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  textoPortaItemNum: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: '500',
  },
  textoPortaSensivel: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  legendaSensivelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  bolinhaVermelhaLegenda: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
    marginRight: 6,
  },
  textoLegendaSensivel: {
    color: '#55657e',
    fontSize: 10,
  },
});
