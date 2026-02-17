# Teste Técnico Neo Estech

## 🚀 Como Rodar o Projeto

```bash
# Clone o repositório
git clone https://github.com/gildoamaral/neo-teste.git

# Entre na pasta do projeto
cd neo-teste

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 🏗️ Decisões de Arquitetura

### Estrutura de Componentes

O projeto foi organizado seguindo princípios de separação de responsabilidades e componentização. Estrutura como definida abaixo:

#### Componentes não reutilizáveis

- <strong>src/components/chamados -</strong> Aqui foram colocados os componentes de trechos da pagina de chamados
- <strong>src/components/dashboard -</strong> Aqui foram colocados os componentes de trechos da pagina de dashboard
- <strong>src/components/layout -</strong> Componentes de layout (Header, Sider...)

#### Componentes reutilizáveis

- <strong>src/components/ui -</strong> Componentes reutilizáveis, genéricos, trechos de ui.

#### Layout Responsivo

- **Layout Híbrido**: Desktop com Sider fixo + Header; Mobile com Drawer menu + Header com hamburger
- **Responsive Design**: Componentes adaptativos usando hook `useBreakpoint` centralizado
- **Barra de Carregamento**: A barra aparece conforme determinação do fetching do Tanstack Query


---

## ⚡ Decisões de Performance

### Estratégias para Alto Volume

- **Paginação** (default 15 itens por pagina, podendo ser exibido até 50)
- Cards no mobile com **renderização condicional**
- **Tanstack Query para cache** através do staleTime, impedindo requisições redundantes
- **Debounce** para barra de pesquisa, esperando 1000 após o usuário acabar de digitar
- **Server Side Pagination** considerando backend simulado, operações de paginação são apenas resgatadas pelo frontend, mas criadas pelo backend

- Foi considerado **Virtualização**, mas descartado por conta do uso de Paginação.
- Foi considerado **Lazy Loading**, mas descartado por não haverem dados pesados sendo carregados (como imagens, componentes complexos, etc)

---

## 💭 O que Faria Diferente se Tivesse Mais Tempo
* Daria mais retoques para a animações suaves, principalmente em dispositivos móveis
* Limparia mais os meus componentes, para ter arquivos menores e mais componentes reutilizáveis
* Utilizaria mais memorização de componentes e funções com useMemo
* Faria retoques visuais, buscaria bugs para corrigir.

---

## 📝 Perguntas Conceituais

### 1. Cache e mutação
Eu utilizaria um hook de mutação com optimistic update.
No onMutate, cancelaria queries em andamento e atualizaria manualmente apenas os caches em que as chaves de filtro são compatíveis com o novo chamado (por exemplo, status = "Aberto" e área = "Refrigeração").
No onSuccess, substituiria o item pelo retorno do servidor. Queries com filtros que não incluem o novo chamado não precisam ser invalidadas. Caso existam listas agregadas, faria invalidação seletiva dessas chaves.

### 2. Performance

### 3. Arquitetura de Componentes

---

**Desenvolvido por Gildo Amaral** | [GitHub](https://github.com/gildoamaral/neo-teste)
