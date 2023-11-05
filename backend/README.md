## **Descrição**

Repositório inicial para o framework **[Nest](https://github.com/nestjs/nest)** escrito em TypeScript.

## **Instalação**

```shell
$ npm install
```

## **Executando o aplicativo**

### **Configuração do Prisma**

Se ainda não tiver feito, crie um arquivo **`.env`** na raiz do projeto e adicione a URL de conexão e demais variáveis:

```dotenv
DATABASE_URL=""
SECRETKEY=
EXPIRESIN=""
```

## **Gerar e Executar Migrações do Prisma**

Você precisará gerar e executar migrações para aplicar as alterações no banco de dados. Siga os comandos abaixo:

```shell
npx prisma migrate dev --name "nome-da-sua-migracao"
```

### **Inicializando o Container do Docker:**

```dotenv
npm run db:up
```

### **Iniciando o Aplicativo:**

```shell
# modo de desenvolvimento
$ npm run start

# modo de observação
$ npm run start:dev

# modo de produção
$ npm run start:prod
```

## **Testes**

```shell
# testes unitários
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```