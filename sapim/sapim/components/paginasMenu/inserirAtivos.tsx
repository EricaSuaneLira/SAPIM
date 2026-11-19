import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface InserirAtivoProps {
  visivel: boolean;
  onFechar: () => void;
  onSalvar: (nome: string, ip: string, tipo: string) => void;
}

export default function InserirAtivos({ visivel, onFechar, onSalvar }: InserirAtivoProps) {
  const [nome, setNome] = useState('');
  const [ip, setIp] = useState('');
  const [tipo, setTipo] = useState('');

  // Função disparada ao clicar no botão de confirmação
  const handleAdicionar = () => {
    if (!nome || !ip || !tipo) return; 
    onSalvar(nome, ip, tipo);
    setNome('');
    setIp('');
    setTipo('');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visivel}
      onRequestClose={onFechar}
    >
      {/* Container de fundo escurecido semitransparente */}
      <View style={styles.fundoModal}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerKeyboard}
        >
          <View style={styles.caixaModal}>
            
            {/* CABEÇALHO DO MODAL */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Inserir novo ativo</Text>
              <TouchableOpacity onPress={onFechar} activeOpacity={0.7}>
                <Feather name="x" size={18} color="#55657e" />
              </TouchableOpacity>
            </View>

            {/* FORMULÁRIO */}
            <View style={styles.formGroup}>
              {/* Campo 1: Nome */}
              <Text style={styles.inputLabel}>Nome do ativo</Text>
              <View style={styles.inputIconBox}>
                <Feather name="server" size={14} color="#55657e" style={styles.iconInput} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: servidor-web"
                  placeholderTextColor="#374151"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              {/* Campo 2: Endereço IP */}
              <Text style={styles.inputLabel}>Endereço IP</Text>
              <View style={styles.inputIconBox}>
                <Feather name="shield" size={14} color="#55657e" style={styles.iconInput} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: 192.168.1.1"
                  placeholderTextColor="#374151"
                  keyboardType="numeric"
                  value={ip}
                  onChangeText={setIp}
                />
              </View>

              {/* Campo 3: Tipo */}
              <Text style={styles.inputLabel}>Tipo</Text>
              <View style={styles.inputIconBox}>
                <Feather name="database" size={14} color="#55657e" style={styles.iconInput} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Ex: Servidor Web / Banco de Dados"
                  placeholderTextColor="#374151"
                  value={tipo}
                  onChangeText={setTipo}
                />
              </View>
            </View>

            {/* BOTÃO DE AÇÃO */}
            <TouchableOpacity 
              style={[styles.btnAdicionar, (!nome || !ip || !tipo) && styles.btnDesativado]} 
              activeOpacity={0.8}
              onPress={handleAdicionar}
              disabled={!nome || !ip || !tipo}
            >
              <Text style={styles.btnTexto}>Adicionar ao monitoramento</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 12, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerKeyboard: {
    width: '100%',
    alignItems: 'center',
  },
  caixaModal: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#0a0f1d',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#161f30',
    paddingBottom: 14,
    marginBottom: 16,
  },
  modalTitulo: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 8,
  },
  inputLabel: {
    color: '#55657e',
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 6,
  },
  inputIconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#070a13',
    borderWidth: 1,
    borderColor: '#161f30',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 16,
  },
  iconInput: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: 12,
    padding: 0,
  },
  btnAdicionar: {
    backgroundColor: '#00d2ff',
    borderRadius: 6,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  btnDesativado: {
    backgroundColor: 'rgba(0, 210, 255, 0.3)', 
  },
  btnTexto: {
    color: '#0a0f1d',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
