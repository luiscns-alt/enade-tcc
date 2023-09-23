### **Passo a Passo para Execução**

### **1. Instalação das Dependências**

Execute o seguinte comando para instalar todas as dependências necessárias:

```shell
npm install
```

### **2. Configuração da BaseURL no Arquivo api.ts**

Localize a pasta **`src/services`** e dentro dela, você encontrará o arquivo **`api.ts`**. A configuração da **`baseURL`** dependerá do ambiente em que você está rodando o aplicativo e do tipo de dispositivo ou emulador que está utilizando.

- **Dispositivo Físico:** Utilize o IP que é mostrado acima do QRCode na página do Metro Bundler. No entanto, observe que a porta a ser configurada não é a do Metro Bundler, mas sim a porta onde a API está rodando.

    ```shell
    Exemplo: http://192.168.5.213:3000
    ```

- **Emulador iOS:** Em emuladores iOS, você pode simplesmente usar **`localhost`** como o endereço IP:

    ```shell
    Exemplo: http://localhost:3000
    ```

- **Emulador Android:** Utilize o IP mostrado no Metro Bundler. Se por acaso não funcionar, você pode usar o IP padrão para emuladores Android.

    ```shell
    Exemplo: http://192.168.5.213:3000 ou http://10.0.2.2:0000
    ```


### **3. Iniciando a Aplicação com o Expo**

Execute o seguinte comando para iniciar o servidor de desenvolvimento:

```shell
expo start
```

Isto irá abrir uma página no seu navegador contendo um QR Code. Para visualizar o aplicativo no seu dispositivo móvel, escaneie o QR Code utilizando o aplicativo Expo Go. Se tiver um emulador instalado no seu computador, você pode rodar o aplicativo diretamente nele.