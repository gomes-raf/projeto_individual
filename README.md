# Reserva+
## :clipboard: Sistema de reserva de salas para agendamentos.
Um sistema para reserva de salas desenvolvido na linguagem Javascript, CSS e HTML.

## :file_folder: Estrutura de Pastas
```text
projeto_individual/
├── assets/              # Arquivos estáticos como imagens, CSS, JS
├── config/              # Configurações da aplicação
├── controllers/         # Controladores da aplicação
├── documentos/          # Documentação adicional ou arquivos auxiliares
├── models/              # Modelos de dados
├── node_modules/        # Dependências instaladas via npm
├── routes/              # Definições de rotas
├── scripts/             # Scripts auxiliares
├── services/            # Lógica de serviços (ex: comunicação com APIs)
├── tests/               # Testes automatizados
├── views/               # Templates da interface do usuário
├── .env                 # Variáveis de ambiente
├── .gitignore           # Arquivos e pastas ignorados pelo Git
├── jest.config.js       # Configuração do Jest para testes
├── package-lock.json    # Lockfile do npm
├── package.json         # Configurações e dependências do projeto
├── readme.md            # Documentação do projeto
├── rest.http            # Requisições HTTP para testes
└── server.js            # Arquivo principal do servidor
```

## :package: Como executar localmente

Passo 1: Clonar o repositório usando Git:

```
git clone https://github.com/gomes-raf/projeto_individual.git
cd projeto_individual
```

Passo 2: Instalar as dependências
Abra um terminal na pasta do projeto e execute:

```
npm install
```

Este comando instalará todas as dependências necessárias listadas no arquivo package.json.

Passo 3: Configurar o banco de dados
Crie um arquivo .env na raiz do projeto com as seguintes informações:

```
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=
DB_SSL=
```

Passo 4: Inicializar o banco de dados
Execute o script de inicialização do banco de dados:

```
npm run init-db
```

Este comando executará o script SQL que criará as tabelas necessárias no banco de dados.

Passo 5: Iniciar o servidor

```
node server.js
```

O servidor será iniciado na porta 3000. Você verá uma mensagem no terminal: Servidor rodando em http://localhost:3000

Passo 6: Acessar o sistema
Basta clicar em http://localhost:3000 que acessará o projeto.
