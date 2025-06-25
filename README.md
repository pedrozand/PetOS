# 🐾 PetOS - Plataforma de Apoio à Comunidade Pet

O **PetOS** é uma aplicação web desenvolvida para conectar **tutores**, **ONGs** e **usuários da comunidade**, com o objetivo de **ajudar na localização de animais perdidos**, **promover adoções responsáveis** e **registrar pets encontrados**. A plataforma oferece uma navegação moderna, intuitiva e eficaz, facilitando a comunicação entre quem perdeu, achou ou deseja adotar um animalzinho. ❤️

---

## 🚀 Funcionalidades

- 📍 Registro de animais perdidos, encontrados e disponíveis para adoção  
- 📸 Upload de imagens para melhor identificação  
- 🔎 Filtro inteligente com base em localização, espécie e outras características  
- 🧭 Mapa com **localização aproximada** do pet, utilizando API gratuita do **OpenStreetMap**  
- 👤 Sistema de **autenticação de usuários** com login e cookies de sessão  
- 🧾 Área exclusiva do usuário para **gerenciar anúncios e editar perfil**
- 💻 Experiencia completa em **UX e IHC** com parametros de segurança e uso. 

---

## 🛠️ Tecnologias Utilizadas

### 💻 Frontend - React

| Biblioteca             | Descrição                                                                 |
| ---------------------- | ------------------------------------------------------------------------- |
| `react`                | Biblioteca principal para construção da UI                                |
| `react-router-dom`     | Roteamento de páginas SPA                                                 |
| `swiper`               | Carrossel moderno e responsivo                                            |
| `leaflet`              | Biblioteca de mapas para renderização de localização                      |
| `@react-leaflet/core`  | Integração entre Leaflet e componentes React                              |
| `react-icons`          | Ícones personalizados e integrados com React                             |
| `framer-motion`        | Animações suaves e interativas para componentes                           |
| `react-toastify`       | Sistema de notificações não intrusivas (toast)                            |
| `sweetalert2`          | Biblioteca para alertas personalizados e estilizados (confirmações, etc.) |
| `axios`                | Requisições HTTP simplificadas ao backend                                 |

---

### 🧠 Estado e Contexto

| Biblioteca                  | Descrição                                             |
| --------------------------- | ----------------------------------------------------- |
| `useContext` + `useState`   | Gerenciamento leve de estado dentro dos componentes   |
| `FormContext` personalizado | Controle global do estado das etapas do formulário    |

---

### 🌐 Backend - Node.js + Express

| Biblioteca       | Descrição                                                      |
| ---------------- | -------------------------------------------------------------- |
| `express`        | Framework leve e robusto para construção de rotas e APIs       |
| `cors`           | Permite acesso entre diferentes origens (CORS)                 |
| `multer`         | Upload e tratamento de imagens dos pets                        |
| `cookie-parser`  | Leitura de cookies para controle de sessões e autenticação     |
| `bcryptjs`       | Criptografia de senhas dos usuários                            |
| `jsonwebtoken`   | Geração e verificação de tokens JWT                            |

---

### 🔧 Banco de Dados - Prisma + SQLite

| Ferramenta        | Descrição                                                                 |
| ----------------- | ------------------------------------------------------------------------- |
| `@prisma/client`  | ORM para modelagem, leitura e escrita de dados                            |
| `prisma`          | CLI para geração de migrations, modelagem de schema e conexão com o banco |
| `SQLite`          | Banco de dados leve, ideal para protótipos e aplicações locais            |

---

## 🗺️ Geolocalização

Para exibir a localização aproximada dos pets no mapa, foi utilizada a **API gratuita do OpenStreetMap** em conjunto com a biblioteca **Leaflet**, possibilitando uma navegação interativa e leve dentro da aplicação, sem depender de APIs pagas.

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

---

### ▶️ Rodar o Projeto

# Inicie o backend
cd server
npm start

# Em outro terminal, inicie o frontend
cd ../client
npm run dev
```

### 🤝 Contribuição

Sugestões e ideias para melhorias são bem-vindas!  
Se você deseja colaborar com o projeto, abra uma issue ou envie um pull request para análise.  
**Toda e qualquer contribuição estará sujeita à minha revisão e aprovação, e não implica em direito de uso, redistribuição ou modificação do código sem minha autorização expressa.**

Para contribuições mais significativas ou parcerias, entre em contato diretamente.

## 📄 Licença

Este projeto é de minha autoria e está protegido por direitos autorais.  
**Não é permitida a cópia, modificação, distribuição ou uso parcial/total do código sem minha autorização expressa por escrito.**  
Para fins acadêmicos ou colaborativos, entre em contato previamente para solicitação de permissão.  
© Pedro Oliveira, todos os direitos reservados.

### 🐶 Dedicado a todos os pets que ainda não encontraram um lar. 💙

Vamos juntos transformar a tecnologia em uma ponte para o cuidado e o reencontro.
