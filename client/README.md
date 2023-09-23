# **Ant Design Pro**

Este projeto foi inicializado com o **[Ant Design Pro](https://pro.ant.design/)**. A seguir, apresentamos um guia rápido
sobre como utilizá-lo.

## **Preparação do Ambiente**

Instale os **`node_modules`**:

```shell
npm install
```

ou

```shell
yarn
```

## ### **2. Configuração da BaseURL no Arquivo api.ts**

Localize a pasta **`client/src/services/ant-design-pro`** e dentro dela, você encontrará o arquivo **`endpoints.ts`**.
Configure a  **`baseURL`** conforme o localhost de sua rede.
````shell
const BASE_URL: string = 'http://localhost:3000';
````

## **Scripts Fornecidos**

O Ant Design Pro fornece alguns scripts úteis para ajudá-lo a iniciar e construir rapidamente seu projeto web, verificar
o estilo do código e testá-lo.

Os scripts estão disponíveis no arquivo **`package.json`**. Você pode modificar ou adicionar mais scripts conforme
necessário:

### **Iniciar o projeto**

```shell
npm start
ou
npm run start:dev
```

### **Construir o projeto**

```shell
npm run build
```

### **Verificar estilo do código**

```shell
npm run lint
```

Você também pode usar um script para corrigir automaticamente alguns erros de lint:

```shell
npm run lint:fix
```

### **Testar o código**

```shell
npm test
```

## **Mais informações**

Para uma documentação completa, visite nosso **[site oficial](https://pro.ant.design/)**. Qualquer feedback é bem-vindo
em nosso **[GitHub](https://github.com/ant-design/ant-design-pro)**.
