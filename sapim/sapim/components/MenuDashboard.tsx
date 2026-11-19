import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';


import Painel from './paginasMenu/painel';
import Ativos from './paginasMenu/ativos';
import Alertas from './paginasMenu/alertas';
import DiagIA from './paginasMenu/diagIA';
import Logs from './paginasMenu/logs';
import GuiaPortas from './paginasMenu/guiaPortas';
import PerfilUsuario from './paginasMenu/perfilUsuario';

interface MenuProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onSair: () => void;
}

export default function MenuDashboard({ activeMenu, setActiveMenu, onSair }: MenuProps) {
  // Estado para controlar a abertura do painel de perfil
  const [perfilVisivel, setPerfilVisivel] = useState(false);
  
  // Controla dinamicamente a quantidade de alertas pendentes
  const [quantidadeAlertas, setQuantidadeAlertas] = useState(7);

  // FUNÇÃO QUE NAVEGA E VERIFICA SE O USUÁRIO ENTROU NA TELA DE ALERTAS
  const navegarParaAba = (idAba: string) => {
    setActiveMenu(idAba);
    if (idAba === 'Alertas em Tempo Real') {
      setQuantidadeAlertas(0); 
    }
  };

  // FUNÇÃO QUE DECIDE QUAL TELA RENDERIZAR NO CENTRO
  const renderCenterContent = () => {
    switch (activeMenu) {
      case 'Painel Principal':
        return <Painel />;
      case 'Ativos e Dispositivos':
        return <Ativos />;
      case 'Alertas em Tempo Real':
        return <Alertas />;
      case 'Diagnóstico e Correlação IA':
        return <DiagIA />;
      case 'Investigação de Logs Brutos':
        return <Logs />;
      case 'Guia de Portas':
        return <GuiaPortas />;
      default:
        return <Painel />;
    }
  };

  // CONFIGURAÇÃO DOS BOTÕES DO MENU INFERIOR
  const abasMenu = [
    { id: 'Painel Principal', label: 'Painel', icon: 'grid', temBadge: false },
    { id: 'Ativos e Dispositivos', label: 'Ativos', icon: 'monitor', temBadge: false },
    { id: 'Alertas em Tempo Real', label: 'Alertas', icon: 'bell', temBadge: true },
    { id: 'Diagnóstico e Correlação IA', label: 'IA Diag', icon: 'target', temBadge: false },
    { id: 'Investigação de Logs Brutos', label: 'Logs', icon: 'file-text', temBadge: false },
    { id: 'Guia de Portas', label: 'Portas', icon: 'terminal', temBadge: false },
  ];

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        
        {/* BARRA SUPERIOR (TOP BAR) — REESTRUTURADA */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Image 
              source={require('../assets/SapimCiberseguranca.png')} 
              style={styles.logoImageTop} 
              resizeMode="contain" 
            />
          </View>

          <View style={{ flex: 1 }} />

          {/* SEÇÃO DIREITA REESTRUTURADA: CONJUNTO AVATAR + NÍVEL TÉCNICO */}
          <View style={styles.topBarRight}>
            <TouchableOpacity 
              style={styles.userProfileWrapperBtn} 
              activeOpacity={0.7}
              onPress={() => setPerfilVisivel(true)} // Abre a central de gerenciamento
            >
              {/* Bloco de texto informativo antes do avatar */}
              <View style={styles.userTextoIdentificaçãoBloco}>
                <Text style={styles.userTextoNomeTop}>Admin Root</Text>
                <Text style={styles.userTextoNivelTop}>SOC — N5</Text>
              </View>
              
              {/* Avatar Circular */}
              <View style={styles.userAvatarBtn}>
                <Text style={styles.userAvatarText}>AR</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ÁREA DE CONTEÚDO CENTRAL */}
        <View style={styles.conteudoCentral}>
          {renderCenterContent()}
        </View>

        {/* MENU INFERIOR (BOTTOM TAB BAR) */}
        <View style={styles.bottomTabBar}>
          {abasMenu.map((aba) => {
            const estaAtivo = activeMenu === aba.id;
            const deveMostrarBadge = aba.temBadge && quantidadeAlertas > 0;

            return (
              <TouchableOpacity
                key={aba.id}
                style={styles.tabButton}
                onPress={() => navegarParaAba(aba.id)}
                activeOpacity={0.7}
              >
                <View style={styles.iconWrapper}>
                  <Feather 
                    name={aba.icon as any} 
                    size={20} 
                    color={estaAtivo ? '#00d2ff' : '#55657e'} 
                  />
                  {deveMostrarBadge && (
                    <View style={styles.tabBadge}>
                      <Text style={styles.tabBadgeText}>{quantidadeAlertas}</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.tabLabel, estaAtivo && styles.tabLabelActive]}>
                  {aba.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>

      <PerfilUsuario
        visivel={perfilVisivel}
        onFechar={() => setPerfilVisivel(false)}
        onSairDoApp={onSair}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#0a0f1d',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#070a13',
  },
  topBar: {
    height: 55,
    backgroundColor: '#0a0f1d',
    borderBottomWidth: 1,
    borderColor: '#161f30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  topBarLeft: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoImageTop: { 
    width: 100, 
    height: 50,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  userProfileWrapperBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 22, 39, 0.4)', 
    paddingVertical: 4,
    paddingLeft: 12,
    paddingRight: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#161f30',
  },
  userTextoIdentificaçãoBloco: {
    alignItems: 'flex-end', 
    marginRight: 10,
  },
  userTextoNomeTop: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '600',
  },
  userTextoNivelTop: {
    color: '#00d2ff', 
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
    letterSpacing: 0.5,
  },
  userAvatarBtn: {
    width: 30, 
    height: 30,
    borderRadius: 15,
    backgroundColor: '#00d2ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    color: '#0a0f1d',
    fontWeight: 'bold',
    fontSize: 11,
  },
  conteudoCentral: {
    flex: 1,
    backgroundColor: '#070a13',
  },
  bottomTabBar: {
    height: 85,
    backgroundColor: '#0a0f1d',
    borderTopWidth: 1,
    borderColor: '#161f30',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 25,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: 4,
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#ef4444',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBadgeText: {
    color: '#ffffff',
    fontSize: 7,
    fontWeight: 'bold',
  },
  tabLabel: {
    color: '#55657e',
    fontSize: 10,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#00d2ff',
    fontWeight: '600',
  },
});
