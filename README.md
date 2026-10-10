# JBS Solar

<img src="img/brand/logo-jbs-solar.png" alt="Logo da JBS Solar" width="120">

**Qualidade e segurança em cada projeto.**

Landing page institucional da JBS Solar, dedicada à apresentação da empresa, dos serviços de energia solar e das regiões de atendimento no Rio Grande do Norte. O visitante pode conhecer as soluções, explorar o mapa de atuação e iniciar uma solicitação de orçamento pelo WhatsApp.

[Visitar o site](https://jbs-solar.vercel.app) · [Instagram da JBS Solar](https://www.instagram.com/jbssolar/)

## Funcionalidades

- Header em linha única no desktop, com logo, navegação e canais de contato. Após 100 px de rolagem, a barra reduz de 80 para 64 px; o item ativo acompanha a seção visível.
- Menu mobile com hamburger, acesso ao Instagram e WhatsApp e fechamento pela tecla Escape.
- Hero com imagem de painéis solares, chamada para orçamento e informações sobre projetos e unidades.
- Mapa interativo das quatro unidades e localidades com atuação no RN, com filtros, zoom e seleção pela lista de cidades.
- Apresentação da estrutura da empresa e vídeo institucional com controles de reprodução.
- Sete serviços com descrições e detalhes em diálogos, acessíveis também por links diretos.
- Formulário de orçamento com validação dos campos e preparação de uma mensagem para o WhatsApp.
- Perguntas frequentes com abertura e fechamento das respostas.

Os serviços apresentados são manutenção, monitoramento de usina solar, usina solar de investimento, energia solar por assinatura, carregador de carro elétrico, sistema de bombeamento solar e solicitações Cosern.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| HTML5 | Estrutura semântica, formulário, vídeo e diálogos de serviços |
| CSS3 | Paleta institucional, componentes e layouts responsivos |
| JavaScript | Navegação, mapa, diálogos, formulário e FAQ |
| MapLibre GL JS | Renderização e interação do mapa |
| OpenFreeMap e OpenStreetMap | Estilo cartográfico e dados do mapa |
| Manrope e Inter | Tipografia carregada pelo Google Fonts |

O projeto é um site estático. A execução local usa um servidor HTTP e dispensa instalação de pacotes ou etapa de build. As fontes e os recursos do mapa são carregados pela internet.

## Executar localmente

Com Git e Python 3 instalados:

```sh
git clone https://github.com/joaogabrielcode/jbs-solar.git
cd jbs-solar
python3 -m http.server 8000
```

Abra [http://localhost:8000](http://localhost:8000). Para encerrar o servidor, pressione `Ctrl + C` no terminal. Caso a porta esteja ocupada, use outra, por exemplo `python3 -m http.server 8765`.

## Estrutura

```text
jbs-solar/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
│   └── brand/
│       ├── logo-jbs-solar.png
│       ├── painel-solar-image.png
│       └── video.mp4
├── .gitignore
└── README.md
```

`index.html` concentra o conteúdo da página, os serviços e os campos do orçamento. `css/style.css` reúne os tokens de cor, fontes, espaçamentos e regras responsivas. `js/main.js` controla as interações e contém os dados das localidades do mapa.

As pastas locais `docs/`, `refs/` e `design_system/` guardam materiais de referência e estão excluídas do versionamento pelo `.gitignore`.

## Manutenção

### Navegação e identidade visual

Os links do header apontam para `inicio`, `empresa`, `solucoes`, `orcamento` e `faq`. O identificador `solucoes` foi mantido na seção Serviços para preservar os links existentes.

A paleta usa navy, azul institucional, ciano e laranja. As cores e os espaçamentos compartilhados são definidos em `:root`, no CSS.

O item “Loja JBS” está identificado como “em breve”. Quando a URL pública estiver disponível, adicione o `href` e remova os atributos de desativação e o texto de disponibilidade no header.

### Mapa

As localidades ficam no array `presenceLocations`, em `js/main.js`. Cada registro informa nome, categoria, latitude, longitude e presença de projetos. Os campos `address` e `mapsUrl` permitem acrescentar endereço e link de rota aos popups das unidades.

Os marcadores atuais representam as localidades. Para apontar uma filial com precisão, use as coordenadas do endereço da unidade. As correções de São Miguel do Gostoso e Diogo Lopes têm suas fontes registradas junto aos dados.

### Orçamento

O formulário monta uma mensagem e abre o WhatsApp da JBS Solar. O visitante confere os dados e envia a mensagem no próprio WhatsApp. O site não armazena os dados do formulário nem confirma o recebimento pela empresa.

O número de atendimento é configurado nos links de contato do HTML e na variável `whatsappUrl` do JavaScript. Ao trocar o número, atualize ambos.

### Serviços

Os detalhes de cada serviço estão no HTML. O JavaScript leva esse conteúdo ao diálogo quando o visitante seleciona “Ver detalhes”. Ao fechar, o foco retorna ao botão que abriu o serviço.

O material local `docs/jbs-servicos-base.md` é a referência de conteúdo dos serviços quando disponível no ambiente de desenvolvimento.

## Verificação

Não há suíte de testes, lint ou build configurados no repositório. Para conferir a sintaxe do JavaScript e a formatação das alterações, execute:

```sh
node --check js/main.js
git diff --check
```

O primeiro comando requer Node.js, usado aqui apenas para verificação.

Antes de publicar uma alteração, confira no navegador:

- Header no topo e durante a rolagem, item ativo e links das seções.
- Menu mobile, navegação por teclado, fechamento com Escape e ausência de rolagem horizontal.
- Abertura e fechamento dos sete serviços, retorno do foco e links diretos.
- Filtros do mapa, seleção das cidades, posição dos marcadores e popups.
- Reprodução do vídeo, respostas do FAQ e validação do formulário.
- Mensagem de orçamento preparada para o WhatsApp e demais links de contato.

## Publicação

O endereço configurado no repositório é [jbs-solar.vercel.app](https://jbs-solar.vercel.app). Os arquivos também podem ser servidos por uma hospedagem estática que preserve a estrutura de `css/`, `js/` e `img/`.

Os recursos do MapLibre são referenciados por CDN no HTML. Ao atualizar sua versão, mantenha os arquivos CSS e JavaScript na mesma versão.
