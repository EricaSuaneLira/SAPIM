import React, { useState, useEffect } from 'react';
import MenuDashboard from './components/MenuDashboard';

import {StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image,} 
from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mfaCode, setMfaCode] = useState('');
  const [activeMenu, setActiveMenu] = useState('Painel Principal');

  // Estado para controlar a contagem dos segundos
  const [seconds, setSeconds] = useState(30);

  // Efeito que roda o cronômetro regressivo quando o usuário entra na tela 2
  useEffect(() => {
    let interval: any; 

    if (step === 2) {
      setSeconds(30); 
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); 
  }, [step]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0f1d" />

    {step !== 'dashboard' && (
      <View style={styles.innerContainer}>

        {/* PARTE FIXA SUPERIOR: LOGO E SUBTÍTULO */}

        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/SapimLogo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* TELA 1: CREDENCIAIS */}

        {step === 1 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather
                name="lock"
                size={18}
                color="#00d2ff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cardTitle}>Autenticação de Acesso</Text>
            </View>
            <Text style={styles.cardSubtitle}>
              Acesso restrito a pessoal autorizado do SOC
            </Text>

            {/* INDICADOR DE ETAPAS */}
            <View style={styles.stepContainer}>
              <View style={styles.stepActive}>
                <Text style={styles.stepActiveText}>1</Text>
              </View>
              <Text style={styles.stepTextActive}>Credenciais</Text>
              <View style={styles.stepLine} />
              <View style={styles.stepInactive}>
                <Text style={styles.stepInactiveText}>2</Text>
              </View>
              <Text style={styles.stepTextInactive}>MFA</Text>
            </View>

            {/* INPUT USUÁRIO */}
            <Text style={styles.inputLabel}>USUÁRIO / E-MAIL</Text>
            <View style={styles.inputContainer}>
              <Feather
                name="user"
                size={18}
                color="#55657e"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="usuario@empresa.com.br"
                placeholderTextColor="#55657e"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* INPUT SENHA */}
            <Text style={styles.inputLabel}>SENHA</Text>
            <View style={styles.inputContainer}>
              <Feather
                name="lock"
                size={18}
                color="#55657e"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#55657e"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={18}
                  color="#55657e"
                />
              </TouchableOpacity>
            </View>

            {/* BOTÃO CONTINUAR */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => setStep(2)}>
              <Text style={styles.buttonText}>CONTINUAR</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* TELA 2: VERIFICAÇÃO EM DOIS FATORES */}
        
        {step === 2 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Feather
                name="shield"
                size={18}
                color="#00d2ff"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cardTitle}>Verificação em Dois Fatores</Text>
            </View>
            <Text style={styles.cardSubtitle}>
              Insira o código TOTP gerado pelo seu autenticador para o seu
              usuário.
            </Text>

            {/* INDICADOR DE ETAPAS */}
            <View style={styles.stepContainer}>
              <View style={styles.stepInactive}>
                <Text style={styles.stepInactiveText}>1</Text>
              </View>
              <Text style={styles.stepTextInactive}>Credenciais</Text>
              <View style={styles.stepLineActive} />
              <View style={styles.stepActive}>
                <Text style={styles.stepActiveText}>2</Text>
              </View>
              <Text style={styles.stepTextActive}>MFA</Text>
            </View>

            {/* INPUT DO CÓDIGO DE 6 DÍGITOS */}
            <Text style={styles.inputLabel}>
              CÓDIGO DE VERIFICAÇÃO (6 DÍGITOS)
            </Text>
            <View style={styles.inputContainer}>
              <Feather
                name="hash"
                size={12}
                color="#55657e"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, styles.mfaInputText]}
                placeholder="0 0 0 0 0 0"
                placeholderTextColor="rgba(0, 210, 255, 0.4)"
                value={mfaCode}
                onChangeText={setMfaCode}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>

            {/* EXIBIÇÃO DA CONTAGEM REGRESSIVA DOS SEGUNDOS */}
            <Text style={styles.timerText}>
              O código expira em{' '}
              <Text style={styles.timerHighlight}>{seconds} segundos</Text>.
              Abra o aplicativo autenticador.
            </Text>

            {/* BOTÃO ACESSAR O SISTEMA */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => setStep('dashboard')}>
              <Text style={styles.buttonText}>ACESSAR O SISTEMA</Text>
            </TouchableOpacity>

            {/* BOTÃO VOLTAR PARA CREDENCIAIS */}
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.7}
              onPress={() => setStep(1)}>
              <Feather
                name="arrow-left"
                size={14}
                color="#55657e"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.backButtonText}>Voltar para credenciais</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )}
      
      {step === 'dashboard' && (
        <MenuDashboard 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
          onSair={() => setStep(1)} 
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0f1d',
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  logoImage: {
    width: 300,
    height: 200,
    marginBottom: -70,
  },
  card: {
    width: '100%',
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#55657e',
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 18,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepActive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00d2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  stepActiveText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#0a0f1d',
  },
  stepTextActive: {
    fontSize: 12,
    color: '#00d2ff',
    fontWeight: '600',
  },
  stepLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#1f2937',
    marginHorizontal: 12,
  },
  stepLineActive: {
    flex: 1,
    height: 1,
    backgroundColor: '#00d2ff',
    marginHorizontal: 12,
  },
  stepInactive: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#55657e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  stepInactiveText: {
    fontSize: 11,
    color: '#55657e',
  },
  stepTextInactive: {
    fontSize: 12,
    color: '#55657e',
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 14,
  },
  mfaInputText: {
    color: '#00d2ff',
    fontSize: 15,
    letterSpacing: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 11,
    color: '#55657e',
    marginBottom: 20,
  },
  timerHighlight: {
    color: '#f59e0b',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#00d2ff',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#0a0f1d',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  backButtonText: {
    color: '#55657e',
    fontSize: 12,
  },
});

