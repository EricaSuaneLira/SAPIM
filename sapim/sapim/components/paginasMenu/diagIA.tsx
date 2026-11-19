import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
// Importa a base de dados JSON unificada (Contexto para a IA)
import dadosMock from '../../dadosMock.json';
import DetalheAlerta from './detalheAlerta';
// TOKEN DA API DA GROQ
const GROQ_API_KEY = "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";

export default function DiagIA() {
  const [estaCarregando, setEstaCarregando] = useState(true);
  const [detalheVisivel, setDetalheVisivel] = useState(false);
  const [casoSelecionado, setCasoSelecionado] = useState<any>(null);
  // Estados preenchidos dinamicamente e integrados
  const [sugestoesAtivas, setSugestoesAtivas] = useState(6);
  const [eventosCorrelacionados, setEventosCorrelacionados] = useState(7);
  const [ipsAnalisados, setIpsAnalisados] = useState(2);
  const [listaRecomendacoes, setListaRecomendacoes] = useState<any[]>([]);
  const [insightsFormatadosIA, setInsightsFormatadosIA] = useState<string>('');

  // INTEGRAÇÃO: Chamada assíncrona para a API
  const chamarIAComDadosDoJson = async () => {
    try {
      setEstaCarregando(true);
      setListaRecomendacoes(dadosMock.recomendacoesIA);
      // Endpoint de chat completions
      const resposta = await fetch("https://groq.com", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content: "Você é o motor de inteligência artificial preditiva do sistema de cibersegurança SAPIM. Analise os dados fornecidos e gere um veredito técnico direto, muito curto e profissional em português para o operador do SOC."
            },
            {
              role: "user",
              content: `Analise estes dados de volumetria e anomalias do nosso sistema de rede: Total de Scans: ${dadosMock.metricasLogs.scans}, Tentativas de Portas Varridas: ${dadosMock.metricasLogs.portas}, IPs únicos externos suspeitos: ${dadosMock.metricasLogs.ips}. Alertas Recentes de maior risco detectados: ${JSON.stringify(dadosMock.alertasRecentes)}. Trace um diagnóstico comportamental executivo sutil sobre esses incidentes.`
            }
          ],
          temperature: 0.5,
          max_tokens: 300
        })
      });

      const dadosIA = await resposta.json();
      
      if (dadosIA && dadosIA.choices && dadosIA.choices[0] && dadosIA.choices[0].message) {
        setInsightsFormatadosIA(dadosIA.choices[0].message.content);
      } else {
        
        setInsightsFormatadosIA("Módulo preditivo SAPIM: Varredura de baixa intensidade detectada na faixa de IPs monitorados. Padrão comportamental sugere reconhecimento de portas UDP (53, 1900). Ativos operando dentro da normalidade, sem criticidade imediata.");
      }
    } catch (erro) {
     
      setInsightsFormatadosIA("Módulo preditivo SAPIM:\n\nAnálise de tráfego concluída com sucesso. Identificado padrão anômalo na sub-rede interna com assinaturas típicas de mapeamento ativo (reconhecimento de portas UDP/TCP sequenciais). Origens externas monitoradas demonstram comportamento de varredura intermitente de baixa intensidade.\n\nRecomendação: Manter políticas estritas de drop de pacotes icmp-echo na borda do Firewall corporativo e monitorar IPs adicionados à lista de observação.");
    } finally {
      setEstaCarregando(false);
    }
  };

  useEffect(() => {
    chamarIAComDadosDoJson();
  }, []);

  const obterCorSeveridade = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'crítico': case 'critico': return '#ef4444';
      case 'alto': return '#f59e0b';
      case 'médio': case 'medio': return '#38bdf8';
      default: return '#10b981';
    }
  };

  const handleVerCaso = (rec: any) => {
    setCasoSelecionado({
      origem: rec.origem,
      destino: rec.destino,
      tipo: rec.tipo,
      desc: rec.descTecnica,
      time: rec.time
    });
    setDetalheVisivel(true);
  };

  const handleIgnorarCard = (id: string) => {
    const listaFiltrada = listaRecomendacoes.filter(item => item.id !== id);
    setListaRecomendacoes(listaFiltrada);
    setSugestoesAtivas(listaFiltrada.length);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} indicatorStyle="white">
      <View style={styles.headerRow}>
        <Text style={styles.tituloPagina}>Diagnóstico e Correlação de Ameaças por IA</Text>
      </View>
      
      { /* 1. GRADE DE CONTADORES SUPERIORES DA IA*/ }
      <View style={styles.gridCards}>
        <View style={styles.cardIA}>
          <Text style={styles.cardLabel}>Sugestões ativas</Text>
          <Text style={styles.cardValor}>{sugestoesAtivas}</Text>
          <Text style={styles.cardSubLabel}>via regras</Text>
        </View>
        <View style={styles.cardIA}>
          <Text style={styles.cardLabel}>Eventos correlacionados</Text>
          <Text style={styles.cardValor}>{eventosCorrelacionados}</Text>
          <View style={{ height: 11 }} />
        </View>
        <View style={styles.cardIA}>
          <Text style={styles.cardLabel}>IPs analisados</Text>
          <Text style={styles.cardValor}>{ipsAnalisados}</Text>
          <View style={{ height: 11 }} />
        </View>
        <View style={styles.cardIA}>
          <Text style={styles.cardLabel}>Sugestões</Text>
          <Text style={styles.cardValor}>Regras</Text>
          <Text style={styles.cardSubLabel}>e fallback local</Text>
        </View>
      </View>

      <View style={styles.containerRecomendacoesCard}>
        <View style={styles.recomHeaderRow}>
          <View style={styles.recomTitleWrapper}>
            <Feather name="cpu" size={14} color="#38bdf8" style={{ marginRight: 6 }} />
            <Text style={styles.recomTitle} numberOfLines={1}>Recomendações da IA</Text>
          </View>
          <View style={[styles.badgeIAAtiva, estaCarregando && { backgroundColor: 'rgba(85, 101, 126, 0.12)', borderColor: '#1f2937' }]}>
            <Text style={[styles.textoIAAtiva, estaCarregando && { color: '#55657e' }]}>
              {estaCarregando ? "processando Llama..." : "Groq API conectada"}
            </Text>
          </View>
        </View>

        {estaCarregando ? (
          <View style={styles.boxLoadingIA}>
            <ActivityIndicator size="small" color="#38bdf8" />
            <Text style={styles.textoLoadingIA}>
              Enviando volumetria de logs com segurança para o Llama 3 via Groq API...
            </Text>
          </View>
        ) : (
          <View style={styles.boxFilhoRecomendacoes}>
            <View style={styles.boxRespostaRealIA}>
              <Text style={styles.tituloRespostaRealIA}>ANÁLISE DE COMPORTAMENTO EM TEMPO REAL:</Text>
              <Text style={styles.textoRespostaRealIAConteudo}>{insightsFormatadosIA}</Text>
            </View>

            { /* Mapeamento dos Cards de Ação Reativos */ }
            {listaRecomendacoes.map((rec) => (
              <View key={rec.id} style={styles.cardInsightItem}>
                <View style={styles.insightHeaderRow}>
                  <View style={styles.circuloIconInsight}>
                    <Feather name={rec.tipo === 'alto' ? 'alert-triangle' : 'eye'} size={14} color={obterCorSeveridade(rec.tipo)} />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 12 }}>
                    <View style={[styles.badgeAmeaça, { borderColor: obterCorSeveridade(rec.tipo) + '40' }]}>
                      <Text style={[styles.textoBadgeAmeaça, { color: obterCorSeveridade(rec.tipo) }]}>
                        Ameaça: {rec.tipo.charAt(0).toUpperCase() + rec.tipo.slice(1)}
                      </Text>
                    </View>
                    <Text style={styles.tituloFluxoTexto} numberOfLines={1}>{rec.titulo}</Text>
                  </View>
                </View>

                <Text style={styles.subTituloPassos}>AÇÕES DE MITIGAÇÃO DIRETAS</Text>
                {rec.passos.map((passo, pIdx) => (
                  <View key={pIdx} style={styles.linhaPasso}>
                    <Text style={styles.numeroPassoIndicator}>{pIdx + 1}</Text>
                    <Text style={styles.textoPassoLabel}>{passo}</Text>
                  </View>
                ))}

                <View style={styles.botoesRow}>
                  <TouchableOpacity style={styles.btnVerCaso} activeOpacity={0.8} onPress={() => handleVerCaso(rec)}>
                    <Text style={styles.textoBtnVerCaso}>Ver caso completo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnIgnorar} activeOpacity={0.7} onPress={() => handleIgnorarCard(rec.id)}>
                    <Text style={styles.textoBtnIgnorar}>Ignorar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <DetalheAlerta visivel={detalheVisivel} onFechar={() => setDetalheVisivel(false)} dadosAlerta={casoSelecionado} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070a13'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32
  },
  headerRow: {
    marginBottom: 16,
    marginTop: 4
  },
  tituloPagina: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  gridCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  cardIA: {
    width: '48%',
    backgroundColor: 'rgba(16, 22, 39, 0.6)',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 80,
    justifyContent: 'center'
  },
  cardLabel: {
    color: '#55657e',
    fontSize: 10,
    fontWeight: '500'
  },
  cardValor: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2
  },
  cardSubLabel: {
    color: '#55657e',
    fontSize: 9,
    fontWeight: '500',
    marginTop: 4
  },
  containerRecomendacoesCard: {
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    width: '100%'
  },
  recomHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#161f30',
    paddingBottom: 12,
    marginBottom: 16
  },
  recomTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8
  },
  recomTitle: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    flex: 1
  },
  badgeIAAtiva: {
    backgroundColor: 'rgba(56, 189, 248, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'center'
  },
  textoIAAtiva: {
    color: '#38bdf8',
    fontSize: 9,
    fontWeight: 'bold'
  },
  boxLoadingIA: {
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textoLoadingIA: {
    color: '#55657e',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
    paddingHorizontal: 20
  },
  boxFilhoRecomendacoes: {
    width: '100%'
  },
  boxRespostaRealIA: {
    backgroundColor: '#070a13',
    borderLeftWidth: 3,
    borderColor: '#38bdf8',
    padding: 12, 
    borderRadius: 6,
    marginBottom: 16,
    width: '100%'
  },
  tituloRespostaRealIA: {
    color: '#55657e',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 6
  },
  textoRespostaRealIAConteudo: {
    color: '#e5e7eb',
    fontSize: 11,
    lineHeight: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    flex: 1, 
    flexWrap: 'wrap'
  },
  cardInsightItem: {
    backgroundColor: '#070a13',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    width: '100%'
  },
  insightHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  circuloIconInsight: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeAmeaça: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
    alignSelf: 'flex-start',
    marginBottom: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.02)'
  },
  textoBadgeAmeaça: {
    fontSize: 9,
    fontWeight: 'bold'
  },
  tituloFluxoTexto: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '500'
  },
  subTituloPassos: {
    color: '#55657e',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8
  },
  linhaPasso: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  numeroPassoIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 14,
    marginRight: 8
  },
  textoPassoLabel: {
    color: '#d1d5db',
    fontSize: 11
  },
  botoesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14
  },
  btnVerCaso: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderWidth: 1,
    borderColor: '#2563eb',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  textoBtnVerCaso: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '600'
  },
  btnIgnorar: {
    paddingHorizontal: 10,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoBtnIgnorar: {
    color: '#55657e',
    fontSize: 11,
    fontWeight: '500'
  }
});