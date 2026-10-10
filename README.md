# JBS Solar

<img src="img/brand/logo-jbs-solar.png" alt="Logo da JBS Solar" width="120">

> Qualidade e segurança em cada projeto.
>
> Projeto, instalação e suporte técnico com acompanhamento em todas as etapas.

Este repositório contém a landing page institucional da JBS Solar. O site reúne a apresentação da empresa, sua presença no Rio Grande do Norte e os serviços relacionados à energia solar. A página conduz o visitante da descoberta das soluções ao primeiro contato com a equipe pelo WhatsApp.

[Conhecer o site](https://jbs-solar.vercel.app) · [Instagram](https://www.instagram.com/jbssolar/) · [Falar com a JBS Solar](https://wa.me/558481479896)

## Proposta do projeto

O projeto organiza as informações que um cliente precisa para entender o trabalho da JBS Solar antes de solicitar atendimento: quais serviços estão disponíveis, onde a empresa atua e como funciona o acompanhamento de um sistema fotovoltaico.

A apresentação atende a diferentes interesses, como um projeto residencial, uma demanda comercial, bombeamento em uma propriedade rural ou uma usina de investimento. Quem já possui um sistema também encontra informações sobre manutenção, monitoramento e suporte técnico.

O contato comercial ocupa um lugar central na página. As chamadas para orçamento levam a um formulário que reúne as informações iniciais do visitante e prepara uma mensagem para a equipe. O atendimento continua pelo WhatsApp.

## O que o visitante encontra

A página segue uma sequência de apresentação da empresa e de seus serviços:

1. Uma abertura com fotografia de painéis solares, a mensagem institucional e acesso direto ao orçamento. Também apresenta os números de projetos realizados e as unidades no RN.
2. Um mapa interativo para explorar as localidades de atuação e identificar as unidades da empresa.
3. Uma seção sobre a estrutura da JBS Solar, com informações sobre equipe própria, documentação dos projetos, monitoramento e pós-venda.
4. Um vídeo institucional para conhecer a empresa.
5. Um catálogo de serviços com descrições e detalhes de cada solução.
6. O formulário de orçamento, seguido das perguntas frequentes e dos canais de contato.

A navegação acompanha essa sequência. O header mantém logo, menu e contatos em uma linha no desktop; durante a rolagem, fica mais compacto e indica a seção atual em laranja. No celular, o menu é aberto pelo hamburger e reúne os links das seções e das redes sociais.

## Presença no Rio Grande do Norte

O mapa apresenta unidades em Macau, Pendências, Alto do Rodrigues e São Miguel do Gostoso. Também inclui Guamaré, Carnaubais, Ipanguaçu, Assú, Itajá e Diogo Lopes entre as localidades com projetos ou atuação.

O visitante pode aproximar o mapa, filtrar unidades e projetos ou escolher uma localidade pela lista. Ao selecionar um ponto, o mapa exibe as informações correspondentes. Os marcadores representam as localidades; os endereços exatos das unidades podem ser acrescentados aos dados do projeto.

## Serviços apresentados

| Serviço | Conteúdo disponível na página |
| --- | --- |
| Manutenção | Manutenção preventiva e corretiva, inspeções e relatório de geração e eficiência |
| Monitoramento de usina solar | Acompanhamento diário, alarmes e análise de consumo e geração |
| Usina Solar de Investimento | Implantação de usina para comercialização de energia |
| Energia Solar por Assinatura | Créditos de energia, contratação e condições da modalidade |
| Carregador de carro elétrico | Instalação de recarga veicular com equipamento do cliente ou solução completa |
| Sistema de bombeamento solar | Instalação e fornecimento de equipamentos para bombeamento com energia solar |
| Solicitações Cosern | Serviços relacionados a titularidade, créditos, faturas e outros atendimentos |

Cada serviço possui um botão “Ver detalhes”, que abre seu conteúdo em um diálogo. Isso permite consultar as informações sem perder a posição na página. Os serviços também podem ser acessados por links diretos.

## Solicitação de orçamento

O formulário pede nome, WhatsApp, cidade, perfil do cliente, serviço de interesse e valor médio da conta de energia. Há um campo opcional para observações.

Depois da validação, o site organiza essas informações em uma mensagem e abre o WhatsApp da JBS Solar. O visitante revisa a mensagem e confirma o envio no próprio aplicativo. O formulário não armazena os dados nem confirma o recebimento pela empresa.

As perguntas frequentes explicam o primeiro contato, as informações necessárias para o atendimento e como consultar a disponibilidade na região do visitante.

## Identidade visual

A landing usa a identidade da JBS Solar para manter a apresentação institucional próxima da linguagem visual da Loja JBS. O fundo navy, os detalhes em ciano e laranja e a tipografia Manrope e Inter aparecem na navegação e nos principais pontos de contato da página.

A fotografia de energia solar dá contexto à abertura, enquanto as seções organizam informações reais sobre a empresa e os serviços. O layout se adapta a desktop e celular, mantendo as ações de orçamento e contato acessíveis durante a navegação.

O item “Loja JBS” está reservado no menu e identificado como “em breve”, aguardando a definição de sua URL pública.

## Implementação

O site foi desenvolvido com HTML, CSS e JavaScript. A estrutura é estática, com os conteúdos no HTML e as interações executadas no navegador.

| Recurso | Implementação |
| --- | --- |
| Estrutura da página | HTML5, com seções semânticas, formulário, vídeo e diálogos |
| Aparência e responsividade | CSS3, com tokens de cores e espaçamentos |
| Interações | JavaScript para navegação, serviços, FAQ e orçamento |
| Mapa | MapLibre GL JS, com estilo do OpenFreeMap e dados do OpenStreetMap |

O projeto dispensa instalação de pacotes e etapa de build. As fontes são carregadas pelo Google Fonts, e o mapa depende de recursos externos. A navegação inclui controles de foco, fechamento por Escape e estilos que respeitam a preferência por movimento reduzido.

## Executar localmente

Com Git e Python 3 instalados:

```sh
git clone https://github.com/joaogabrielcode/jbs-solar.git
cd jbs-solar
python3 -m http.server 8000
```

Abra [http://localhost:8000](http://localhost:8000). Para encerrar o servidor, pressione `Ctrl + C` no terminal.

## Organização dos arquivos

| Arquivo ou pasta | Responsabilidade |
| --- | --- |
| `index.html` | Conteúdo institucional, serviços, formulário e links de contato |
| `css/style.css` | Identidade visual, componentes e regras responsivas |
| `js/main.js` | Interações da página e dados das localidades do mapa |
| `img/brand/` | Logo, fotografia de painéis solares e vídeo institucional |

Os materiais locais em `docs/`, `refs/` e `design_system/` são referências de desenvolvimento e estão excluídos do versionamento. Quando disponível, `docs/jbs-servicos-base.md` é a referência para o conteúdo dos serviços.

## Verificação e manutenção

Para conferir a sintaxe do JavaScript e a formatação das alterações:

```sh
node --check js/main.js
git diff --check
```

Node.js é necessário apenas para a primeira verificação. O repositório não possui suíte de testes automatizados configurada.

Ao alterar a página, confira no navegador a navegação em desktop e mobile, os detalhes dos serviços, os filtros e marcadores do mapa, o vídeo, o FAQ e a mensagem preparada pelo formulário de orçamento.

As localidades ficam no array `presenceLocations`, em `js/main.js`. Ao atualizar o número de atendimento, ajuste os links de WhatsApp no HTML e a variável `whatsappUrl` no JavaScript. Os arquivos podem ser publicados em uma hospedagem estática que preserve a estrutura de `css/`, `js/` e `img/`.
