# 📱 SAPIM Mobile — Aplicativo de Monitoramento e Alertas

Este repositório contém o aplicativo móvel do **SAPIM** (*Sistema para Análise de Portas Inteligente e Monitoramento*). Desenvolvido em **JavaScript (JSX)** com **React Native** e **Expo**, o app oferece uma interface nativa e responsiva para que administradores acompanhem o status de servidores, logs de portas e alertas gerados por Inteligência Artificial em tempo real.

---

## 🎯 Funcionalidades do Aplicativo

- **Dashboard Mobile Nativo:** Visualização rápida do status geral dos servidores monitorados e resumo de incidentes.
- **Cards de Diagnóstico (Material Design):** Exibição organizada de alertas e recomendações de mitigação gerados pela IA, utilizando componentes estruturados (`Card`).
- **Monitoramento de Portas e Tráfego:** Listagem dinâmica de portas abertas, protocolos detectados e histórico de varreduras.
- **Integração com API REST:** Comunicação assíncrona com o back-end do SAPIM para atualização de logs e notificações de segurança.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** JavaScript (ES6+) com sintaxe JSX
- **Framework Mobile:** React Native
- **Plataforma / Ambiente:** Expo (compatível com Expo Go e Expo Snack)
- **Biblioteca de Interface (UI):** React Native Paper (Material Design)
- **Estilização:** React Native `StyleSheet` (CSS-in-JS)

---

## 📂 Estrutura de Pastas

```text
sapim-mobile/
├── App.js                  # Componente raiz e estrutura principal da tela
├── components/             # Componentes reutilizáveis da interface
│   └── AssetExample.js     # Exemplo de componente modularizado
├── assets/                 # Ícones, imagens e recursos visuais
├── app.json                # Configurações do projeto Expo
└── package.json            # Dependências e scripts do projeto