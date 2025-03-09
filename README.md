# 📦 Estoque Project Development

### 🛠️ Sobre o Projeto
Este é um sistema simples de gerenciamento de estoque desenvolvido com **Electron.js**. Ele permite adicionar, editar e excluir itens diretamente de uma interface intuitiva, armazenando os dados em um arquivo **data.json**.

---

## 🚀 Funcionalidades
- 📌 **Adicionar itens** com nome, preço, quantidade e total calculado.
- ✏️ **Editar itens** ao clicar na tabela.
- ❌ **Deletar itens** utilizando um botão de remoção.
- 💾 **Persistência de dados** com JSON para armazenamento local.

---

## 📂 Estrutura do Projeto
```
📦 Estoque-Project
├── 📁 data               # Arquivos de dados
│   ├── data.json        # Armazena os itens do estoque
├── 📁 src                # Código-fonte
│   ├── main.js          # Processo principal do Electron
│   ├── preload.js       # Comunicação entre frontend e backend
│   ├── renderer.js      # Manipulação da interface
│   ├── entryData.js     # Gerenciamento dos dados
│   ├── sendRenderer.js  # Envio de dados ao frontend
├── 📁 assets             # Ícones e imagens
├── 📄 index.html         # Interface do usuário
├── 📄 styles.css         # Estilos da aplicação
├── 📄 package.json       # Dependências e configurações
├── 📄 README.md          # Documentação do projeto
├── 📄 .gitignore         # Arquivos ignorados pelo Git
├── 📄 .env               # Variáveis de ambiente
```

---

## 🏗️ Como Rodar o Projeto
### 1️⃣ Clonar o Repositório
```sh
git clone https://github.com/seu-usuario/estoque-project.git
cd estoque-project
```

### 2️⃣ Instalar Dependências
```sh
npm install
```

### 3️⃣ Rodar a Aplicação
```sh
npm start
```

---

## 📌 Atalhos Úteis
- **Enter** ➜ Adiciona um item
- **Clique na Tabela** ➜ Edita um item
- **Delete** ➜ Limpa os inputs

---

## 📜 Licença
Este projeto está sob a licença **MIT**.

💡 *Sinta-se à vontade para contribuir e aprimorar este projeto!* 🚀

