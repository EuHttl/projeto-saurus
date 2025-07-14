# Saurus - Desafio Técnico

Este projeto é uma aplicação web desenvolvida como parte de um desafio técnico para a Saurus. O objetivo é demonstrar habilidades em React, integração com APIs REST, boas práticas de UI/UX e organização de código.

## 🚀 Funcionalidades

- **Tela de Login:**
  - Autenticação de usuário com validação e feedback de erro.
  - Integração pronta para API real ou uso de mocks para desenvolvimento.

- **Tela de Pedidos:**
  - Listagem de pedidos pendentes com paginação.
  - Filtros por nome, CNPJ e código do pedido.
  - Seleção de pedido para pagamento.
  - Mock de dados para desenvolvimento offline.

- **Tela de Pagamento:**
  - Exibição dos detalhes do pedido selecionado.
  - Seleção de forma de pagamento: Crédito, Débito ou PIX.
  - Para PIX, Digitar a chave pix.
  - Simulação de processamento de pagamento.
  - Pronto para integração com endpoint real de pagamento.

## 🛠️ Tecnologias Utilizadas
- React 18
- React Router DOM
- Axios
- Vite
- CSS moderno e responsivo

## 🎨 Diferenciais Técnicos
- Código limpo, modular e comentado.
- Componentes reutilizáveis e estilização inspirada nas imagens.
- Separação clara entre lógica de mocks e integração real com API.
- Pronto para deploy em ambientes modernos.

## 📦 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone <repo-url>
   cd projeto-saurus
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Inicie o projeto:**
   ```bash
   npm run dev
   ```
4. **Acesse:**
   - [http://localhost:5173](http://localhost:5173)

## 🔄 Como trocar dos mocks para a API real

- **Pedidos:**
  - Arquivo: `src/pages/Orders/Orders.jsx`
  - Trocar mock pela api real.

- **Pagamento:**
  - Arquivo: `src/pages/Payment/Payment.jsx`
  - Trocar para `/financeiro/retorno`.

- **Login:**
  - Arquivo: `src/pages/Login/Login.jsx`
  - Possui dois modos, prod e dev.


## 📚 Documentação da API
- [Swagger Saurus](https://api-pedido-erp-gateway-prod.saurus.net.br/swagger/index.html)

## Portfólio e LinkedIn
- [LinkedIn](https://www.linkedin.com/in/hyttalo-costa-1991841b2/)
- [GitHub](https://github.com/EuHttl?tab=repositories)

**Obrigado pela oportunidade!**

Este projeto foi desenvolvido com foco em clareza, escalabilidade e experiência do usuário. Fique à vontade para entrar em contato para dúvidas técnicas ou feedback.
