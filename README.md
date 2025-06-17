# 🐾 PetOS - Plataforma de Apoio à Comunidade Pet

O **PetOS** é uma aplicação web que conecta tutores, ONGs e usuários da comunidade para ajudar a **encontrar animais perdidos**, **promover adoções** e **registrar pets encontrados**. Com um formulário intuitivo, sistema de localização e visual moderno, o PetOS facilita a comunicação entre quem perdeu, achou ou quer adotar um animalzinho. ❤️

## 🚀 Funcionalidades

- 📍 Registro de animais perdidos, encontrados e para adoção
- 📸 Upload de imagens
- 🔎 Filtro inteligente com localização e características do animal
- 🧭 Mapa com localização aproximada do pet
- 👤 Sistema de autenticação e login
- 🧾 Área do usuário para editar perfil e visualizar anúncios

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend - React

| Biblioteca            | Descrição                                               |
| --------------------- | ------------------------------------------------------- |
| `react`               | Biblioteca principal para construção da UI              |
| `react-router-dom`    | Roteamento de páginas                                   |
| `swiper`              | Carrossel moderno e responsivo                          |
| `leaflet`             | Mapa interativo para localização                        |
| `react-icons`         | Ícones personalizados                                   |
| `framer-motion`       | Animações suaves para componentes                       |
| `@react-leaflet/core` | Integração do Leaflet com React                         |
| `react-toastify`      | Notificações amigáveis ao usuário (toasts) _(opcional)_ |

### 🧠 Estado e Contexto

| Biblioteca                  | Descrição                               |
| --------------------------- | --------------------------------------- |
| `useContext` + `useState`   | Gerenciamento leve de estado            |
| `FormContext` personalizado | Controle global de etapas do formulário |

---

### 🌐 Backend - Node.js + Express

| Biblioteca      | Descrição                                     |
| --------------- | --------------------------------------------- |
| `express`       | Framework de rotas e middlewares              |
| `cors`          | Permite o acesso de diferentes origens (CORS) |
| `multer`        | Upload de arquivos (fotos dos animais)        |
| `cookie-parser` | Leitura de cookies para autenticação          |
| `bcryptjs`      | Criptografia de senhas                        |
| `jsonwebtoken`  | Criação e verificação de tokens de sessão     |

### 🔧 Banco de Dados - Prisma + SQLite

| Ferramenta       | Descrição                                            |
| ---------------- | ---------------------------------------------------- |
| `@prisma/client` | ORM para acessar e modelar os dados                  |
| `prisma`         | CLI para geração de migrations e modelagem do schema |
| `SQLite`         | Banco de dados leve e embutido                       |

---

## 🧪 Como Rodar o Projeto

### 📦 Instalar dependências

```bash
# Instale o frontend
cd client
npm install

# Instale o backend
cd ../server
npm install

### ▶️ Rodar o Projeto

# Inicie o backend
cd server
npm start

# Em outro terminal, inicie o frontend
cd ../client
npm run dev
```

### Estrutura do Projeto

PetOS/
├── client/ # Aplicação React
│ ├── components/ # Componentes reutilizáveis
│ ├── pages/ # Páginas principais
│ ├── assets/ # Imagens e ícones
│ └── ...
├── server/ # Backend Node.js com Express e Prisma
│ ├── index.js # Entrada do servidor
│ ├── prisma/ # Schema e banco de dados
│ └── ...
└── README.md # Documentação

### 🤝 Contribuição

Contribuições são bem-vindas! Abra uma issue ou envie um pull request.

### 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e distribuir. ✌️

### 🐶 Dedicado a todos os pets que ainda não encontraram um lar. 💙
