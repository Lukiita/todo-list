# Todo List - Monorepo Project

## 📝 **Descrição**
Este projeto é uma aplicação de lista de tarefas (ToDo List) construída com **Angular** no frontend e **Node.js** no backend, utilizando o **Firestore** como banco de dados. O monorepo foi estruturado com **Yarn Workspaces**, permitindo uma organização eficiente e escalável. 

O objetivo principal deste projeto é demonstrar a capacidade de criar um sistema completo e responsivo, com funcionalidades como criação, listagem e compartilhamento de tarefas entre usuários autenticados.

---

## 🌐 **Links do Projeto**
- **Frontend (Firebase Hosting):** [https://todo-8b133.web.app/](https://todo-8b133.web.app/)

---

## 🧑‍💻 **Usuários de Teste**
Para acessar o sistema, utilize um dos logins de teste abaixo:

1. **Usuário 1**  
   - Email: `user1@test.com`  
   - Senha: `password123`

2. **Usuário 2**  
   - Email: `user2@test.com`  
   - Senha: `password123`

---

## ⚙️ **Pré-requisitos**
Certifique-se de ter as seguintes ferramentas instaladas antes de começar:
- **Node.js**: Versão 22.11.0
- **Yarn**: Gerenciador de pacotes
- **Docker** e **Docker Compose**: Para rodar o backend
- **Firebase CLI**: Para gerenciar o hosting (se necessário)

---

## 🚀 **Como Executar o Projeto Localmente**

### 1️⃣ **Clone o Repositório**
```bash
git clone https://git.vibbra.com.br/lucas-1651863847/todo-list.git
cd todo-list
```

### 2️⃣ Instale as Dependências
Com o Yarn Workspaces, basta rodar o seguinte comando na raiz do projeto:

```bash
yarn install
```

### 3️⃣ Execute o Backend
O backend foi configurado para rodar em um container Docker. Para subir o backend, utilize:


```bash
docker compose up
```

O backend estará disponível na URL: http://localhost:3000.

### 4️⃣ Execute o Frontend
Como o frontend não possui Docker configurado, execute manualmente o comando abaixo:

```bash
yarn start:frontend
```
O frontend estará acessível em: http://localhost:4200.

---

## 📚 Estrutura do Projeto
Abaixo, uma visão geral da estrutura principal do monorepo:

```csharp
todo-list/
├── backend/        # Código do backend (Node.js, Firestore)
├── frontend/       # Código do frontend (Angular)
├── docker-compose.yml # Configuração para rodar o backend via Docker
├── README.md       # Documentação do projeto
├── package.json    # Configurações do monorepo
└── yarn.lock       # Controle de dependências
```

--- 

## 🔑 Funcionalidades Implementadas
### Backend
* API para gerenciar tarefas (CRUD)
* Autenticação via Firebase Authentication
* Compartilhamento de tarefas entre usuários

### Frontend
* Tela de login responsiva
* Listagem e criação de tarefas
* Arrastar e soltar para reordenar tarefas
* Compartilhamento de tarefas com diferentes usuários

---

## 🛠️ Como Realizar o Deploy
### Backend
O backend está hospedado no Render. Para atualizá-lo, basta enviar alterações para o branch principal do repositório conectado ao Render. 
O Render cuidará do build e do deploy automaticamente.

### Frontend
O frontend está hospedado no Firebase Hosting. Para realizar o deploy, utilize os comandos abaixo:

```bash
firebase login
firebase deploy
```

---

## 🤝 Contribuições
Se você deseja contribuir para este projeto, abra uma issue ou envie um pull request com suas sugestões. Toda ajuda é bem-vinda!
