import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, ScrollView, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dadosMock from '../../dadosMock.json';

interface PerfilUsuarioProps {
  visivel: boolean;
  onFechar: () => void;
  onSairDoApp?: () => void; 
}

export default function PerfilUsuario({ visivel, onFechar, onSairDoApp }: PerfilUsuarioProps) {
  const [subTelaAtiva, setSubTelaAtiva] = useState<'perfil' | 'gerenciamento' | 'planos'>('perfil');
  const usuario = dadosMock.perfilUsuario;

  // Função para simular o botão Sair
  const handleSair = () => {
    onFechar();
    if (onSairDoApp) {
      onSairDoApp();
    } else {
      console.log('Sair do sistema acionado');
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={visivel} onRequestClose={onFechar}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          
          {/* CABEÇALHO DE NAVEGAÇÃO INTERNA DO MODAL */}
          <View style={styles.modalHeader}>
            {subTelaAtiva !== 'perfil' ? (
              <TouchableOpacity style={styles.btnVoltarHeader} onPress={() => setSubTelaAtiva('perfil')} activeOpacity={0.7}>
                <Feather name="chevron-left" size={16} color="#00d2ff" />
                <Text style={styles.textoVoltarHeader}>Voltar</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ width: 60 }} />
            )}
            
            <Text style={styles.modalTituloHeader}>
              {subTelaAtiva === 'perfil' && 'Perfil do Operador'}
              {subTelaAtiva === 'gerenciamento' && 'Gerenciamento de Acesso'}
              {subTelaAtiva === 'planos' && 'Planos e Assinaturas'}
            </Text>

            <TouchableOpacity onPress={onFechar} style={styles.btnFecharModal} activeOpacity={0.7}>
              <Feather name="x" size={18} color="#55657e" />
            </TouchableOpacity>
          </View>

          {/* RENDERIZAÇÃO CONDICIONAL DAS SUBTELAS */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            {/* SUBTELA 1: EXIBIÇÃO DO PERFIL PRINCIPAL */}
            {subTelaAtiva === 'perfil' && (
              <View>
                {/* Cartão de Identificação do Profissional de TI */}
                <View style={styles.cardIdentificacao}>
                  <View style={styles.avatarGrande}>
                    <Text style={styles.textoAvatarGrande}>{usuario.iniciais}</Text>
                  </View>
                  <Text style={styles.nomeUsuario}>{usuario.nome}</Text>
                  <Text style={styles.emailUsuario}>{usuario.email}</Text>
                  
                  <View style={styles.badgeNivelSOC}>
                    <Text style={styles.textoBadgeSOC}>{usuario.nivel}</Text>
                  </View>
                </View>

                {/* Bloco de Detalhes Técnicos da Área de TI */}
                <View style={styles.sectionInfoDados}>
                  <Text style={styles.sectionLabelTitulo}>DADOS OPERACIONAIS (SOC)</Text>
                  
                  <View style={styles.linhaDadoTecnico}>
                    <Feather name="briefcase" size={14} color="#55657e" style={{ marginRight: 10 }} />
                    <View>
                      <Text style={styles.dadoLabel}>FUNÇÃO CADASTRADA</Text>
                      <Text style={styles.dadoValor}>{usuario.funcao}</Text>
                    </View>
                  </View>

                  <View style={styles.linhaDadoTecnico}>
                    <Feather name="users" size={14} color="#55657e" style={{ marginRight: 10 }} />
                    <View>
                      <Text style={styles.dadoLabel}>EQUIPE</Text>
                      <Text style={styles.dadoValor}>{usuario.equipe}</Text>
                    </View>
                  </View>
                </View>

                {/* BOTÕES DE DIRECIONAMENTO PARA AS NOVAS SUBTELAS */}
                <View style={styles.grupoBotoesMenu}>
                  {/* Botão Gerenciamento (Condicional Admin) */}
                  <TouchableOpacity 
                    style={[styles.botaoMenuAction, !usuario.isAdmin && styles.botaoMenuDesativado]}
                    activeOpacity={0.8}
                    onPress={() => {
                      if (usuario.isAdmin) {
                        setSubTelaAtiva('gerenciamento');
                      }
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather name="shield" size={16} color={usuario.isAdmin ? '#00d2ff' : '#374151'} style={{ marginRight: 12 }} />
                      <Text style={[styles.textoBotaoMenu, !usuario.isAdmin && { color: '#374151' }]}>Gerenciamento de Acesso</Text>
                    </View>
                    {usuario.isAdmin ? (
                      <Feather name="chevron-right" size={16} color="#55657e" />
                    ) : (
                      <Feather name="lock" size={14} color="#374151" />
                    )}
                  </TouchableOpacity>

                  {/* Botão Planos e Pagamentos */}
                  <TouchableOpacity style={styles.botaoMenuAction} activeOpacity={0.8} onPress={() => setSubTelaAtiva('planos')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather name="credit-card" size={16} color="#00d2ff" style={{ marginRight: 12 }} />
                      <Text style={styles.textoBotaoMenu}>Planos e pagamentos</Text>
                    </View>
                    <Feather name="chevron-right" size={16} color="#55657e" />
                  </TouchableOpacity>

                  {/* Botão de Sair com Layout de Atenção */}
                  <TouchableOpacity style={[styles.botaoMenuAction, styles.btnSairBorda]} activeOpacity={0.8} onPress={handleSair}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Feather name="log-out" size={16} color="#ef4444" style={{ marginRight: 12 }} />
                      <Text style={[styles.textoBotaoMenu, { color: '#ef4444', fontWeight: 'bold' }]}>Sair do sistema</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* SUBTELA 2: GERENCIAMENTO DE ACESSOS (SOMANTE PARA ADMIN) */}
            {subTelaAtiva === 'gerenciamento' && (
              <View style={styles.containerSubTela}>
                <Text style={styles.subTelaIntroTexto}>Cadastre e gerencie as permissões dos analistas do SOC.</Text>
                
                {/* Botão Novo Cadastro */}
                <TouchableOpacity style={styles.btnAdicionarMembro} activeOpacity={0.8}>
                  <Feather name="user-plus" size={14} color="#0a0f1d" style={{ marginRight: 6 }} />
                  <Text style={styles.textoBtnMembro}>Cadastrar novo analista</Text>
                </TouchableOpacity>

                {/* Lista de Usuários Existentes do Time */}
                <View style={styles.listaMembrosCard}>
                  {dadosMock.usuariosGerenciamento.map((item) => (
                    <View key={item.id} style={styles.linhaMembroItem}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.membroNomeText}>{item.nome}</Text>
                        <Text style={styles.membroEmailText}>{item.email}  ·  {item.cargo}</Text>
                      </View>
                      <View style={[styles.statusMembroBadge, item.status === 'Pendente' && { backgroundColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' }]}>
                        <Text style={[styles.statusMembroTexto, item.status === 'Pendente' && { color: '#f59e0b' }]}>{item.status}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* SUBTELA 3: PLANOS E PAGAMENTOS */}
            {subTelaAtiva === 'planos' && (
              <View style={styles.containerSubTela}>
                <Text style={styles.subTelaIntroTexto}>Escolha a volumetria ideal de pacotes e ferramentas para a sua infraestrutura.</Text>
                
                {/* Mapeamento de Planos comerciais reais */}
                {dadosMock.planosPlataforma.map((plano) => (
                  <View key={plano.id} style={styles.cardPlanoComercial}>
                    <Text style={styles.planoNomeTitulo}>{plano.nome}</Text>
                    
                    <View style={styles.linhaPrecoRow}>
                      <Text style={styles.planoValorPreco}>{plano.preco}</Text>
                      <Text style={styles.planoValorPeriodo}>{plano.periodo}</Text>
                    </View>

                    <Text style={styles.planoDescricaoTxt}>{plano.desc}</Text>
                    
                    <View style={styles.divisorLinha} />

                    {plano.recursos.map((rec, rIdx) => (
                      <View key={rIdx} style={styles.linhaRecursoPlano}>
                        <Feather name="check" size={12} color="#10b981" style={{ marginRight: 8 }} />
                        <Text style={styles.textoRecursoPlanoLabel}>{rec}</Text>
                      </View>
                    ))}

                    <TouchableOpacity style={styles.btnAdquirirPlano} activeOpacity={0.8}>
                      <Text style={styles.textoBtnAdquirir}>Adquirir Licença</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { 
    flex: 1, 
    backgroundColor: '#0a0f1d' 
  },
  container: { 
    flex: 1, 
    backgroundColor: '#070a13' 
  },
  modalHeader: { 
    height: 55, 
    backgroundColor: '#0a0f1d', 
    borderBottomWidth: 1, 
    borderColor: '#161f30', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 16 
  },
  btnVoltarHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: 60 
  },
  textoVoltarHeader: { 
    color: '#00d2ff', 
    fontSize: 12, 
    marginLeft: 4, 
    fontWeight: '600' 
  },
  modalTituloHeader: { 
    color: '#ffffff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  btnFecharModal: { 
    padding: 4, 
    width: 60, 
    alignItems: 'flex-end' 
  },
  scrollContent: { 
    padding: 16, 
    paddingBottom: 40 
  },
  cardIdentificacao: { 
    backgroundColor: '#0a0f1d', 
    borderWidth: 1, 
    borderColor: '#161f30', 
    borderRadius: 12, 
    padding: 20, 
    alignItems: 'center', 
    marginBottom: 16 
  },
  avatarGrande: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: '#00d2ff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  textoAvatarGrande: { 
    color: '#0a0f1d', 
    fontWeight: 'bold', 
    fontSize: 20 
  },
  nomeUsuario: { 
    color: '#ffffff', 
    fontSize: 16, 
    fontWeight: 'bold'
  },
  emailUsuario: { 
    color: '#55657e', 
    fontSize: 12, 
    marginTop: 2, 
    marginBottom: 12 
  },
  badgeNivelSOC: { 
    backgroundColor: 'rgba(0, 210, 255, 0.1)', 
    borderWidth: 1, 
    borderColor: 'rgba(0, 210, 255, 0.3)', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    paddingVertical: 4 
  },
  textoBadgeSOC: { 
    color: '#00d2ff', 
    fontSize: 10, 
    fontWeight: 'bold' 
  },
  sectionInfoDados: { 
    backgroundColor: '#0a0f1d', 
    borderWidth: 1, 
    borderColor: '#161f30', 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 16 
    },
  sectionLabelTitulo: { 
    color: '#55657e', 
    fontSize: 9, 
    fontWeight: 'bold', 
    letterSpacing: 1, 
    marginBottom: 14 
  },
  linhaDadoTecnico: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 16,
    width: '100%',
  },
  dadoLabel: { 
    color: '#55657e', 
    fontSize: 9, 
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  dadoValor: { 
    color: '#ffffff', 
    fontSize: 11, 
    fontWeight: '400', 
    marginTop: 2,
    flex: 1,
    flexWrap: 'wrap', 
    paddingRight: 16, 
  },
  grupoBotoesMenu: { 
    backgroundColor: '#0a0f1d', 
    borderWidth: 1, 
    borderColor: '#161f30', 
    borderRadius: 10, 
    paddingVertical: 6, 
    marginBottom: 16 
  },
  botaoMenuAction: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 14, paddingHorizontal: 16, 
    borderBottomWidth: 1, 
    borderColor: 'rgba(22, 31, 48, 0.5)' 
  },
  botaoMenuDesativado: { opacity: 0.4 },
  textoBotaoMenu: { 
    color: '#ffffff', 
    fontSize: 12, 
    fontWeight: '500' 
  },
  btnSairBorda: { borderBottomWidth: 0 },
  containerSubTela: { paddingTop: 4 },
  subTelaIntroTexto: {
    color: '#55657e', 
    fontSize: 12, 
    lineHeight: 16, 
    marginBottom: 16 
  },
  btnAdicionarMembro: { 
    backgroundColor: '#00d2ff',
    borderRadius: 6, height: 38, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  textoBtnMembro: { 
    color: '#0a0f1d', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  listaMembrosCard: { 
    backgroundColor: '#0a0f1d', 
    borderWidth: 1, 
    borderColor: '#161f30', 
    borderRadius: 8, 
    paddingHorizontal: 14 
  },
  linhaMembroItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderColor: '#161f30' 
  },
  membroNomeText: { 
    color: '#ffffff', 
    fontSize: 12, 
    fontWeight: '600' 
  },
  membroEmailText: { 
    color: '#55657e', 
    fontSize: 10, 
    marginTop: 2 
  },
  statusMembroBadge: { 
    backgroundColor: 'rgba(16, 185, 129, 0.1)', 
    borderWidth: 1, 
    borderColor: 'rgba(16, 185, 129, 0.3)', 
    borderRadius: 4, 
    paddingHorizontal: 8, 
    paddingVertical: 2 
  },
  statusMembroTexto: { 
    color: '#10b981', 
    fontSize: 9, 
    fontWeight: 'bold' 
  },
  cardPlanoComercial: { 
    backgroundColor: '#0a0f1d', 
    borderWidth: 1, 
    borderColor: '#161f30', 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 16 
  },
  planoNomeTitulo: { 
    color: '#00d2ff', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  linhaPrecoRow: { 
    flexDirection: 'row', 
    alignItems: 'baseline', 
    marginVertical: 8 
  },
  planoValorPreco: { 
    color: '#ffffff', 
    fontSize: 24, 
    fontWeight: 'bold' 
  },
  planoValorPeriodo: {
    color: '#55657e', 
    fontSize: 12, 
    marginLeft: 4 
  },
  planoDescricaoTxt: { 
    color: '#9ca3af', 
    fontSize: 11, 
    lineHeight: 15, 
    marginBottom: 12 
  },
  divisorLinha: { 
    height: 1, 
    backgroundColor: '#161f30', 
    marginBottom: 12 
  },
  linhaRecursoPlano: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 6 
  },
  textoRecursoPlanoLabel: { 
    color: '#ffffff', 
    fontSize: 11 
  },
  btnAdquirirPlano: { 
    backgroundColor: 'rgba(0, 210, 255, 0.1)', 
    borderWidth: 1, borderColor: '#00d2ff', 
    borderRadius: 6, 
    height: 38, 
    justifyContent: 'center', 
    alignItems: 'center',
     marginTop: 16 
  },
  textoBtnAdquirir: { 
    color: '#00d2ff', 
    fontSize: 12, 
    fontWeight: 'bold' 
  }
});
