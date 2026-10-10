# JBS Solar | Projeto de frontend

Projeto do meu portfólio de desenvolvimento web: uma landing page responsiva construída com HTML, CSS e JavaScript para a JBS Solar. O repositório documenta a implementação da interface, as decisões de layout e as interações do site.

[Ver demonstração](https://jbs-solar.vercel.app) · [Meu perfil no GitHub](https://github.com/joaogabrielcode)

## Sobre o desenvolvimento

O trabalho envolve transformar conteúdo institucional em uma página com navegação clara, identidade visual consistente e adaptação a diferentes tamanhos de tela. A implementação combina seções de conteúdo com recursos interativos: mapa, detalhes de serviços, vídeo, FAQ e formulário.

A referência visual da Loja JBS orientou os ajustes do header e sua relação com o hero. A navegação foi reorganizada em uma linha no desktop, com logo à esquerda, links na região central e redes sociais à direita. Durante a rolagem, a barra reduz de altura e destaca a seção atual.

O projeto também inclui revisão de espaçamentos, hierarquia tipográfica e comportamento no mobile. Os componentes usam a mesma paleta e os mesmos tokens de estilo para manter a interface consistente ao longo da página.

## Funcionalidades implementadas

### Navegação responsiva

O header permanece fixo e passa de 80 para 64 px após 100 px de rolagem. A mudança preserva o espaço reservado no documento para evitar deslocamentos do conteúdo. O item ativo acompanha a posição das seções e usa texto e linha inferior em laranja.

No mobile, os links ficam em um menu hamburger. O menu pode ser fechado com Escape, mantém a navegação por teclado dentro dos controles disponíveis enquanto está aberto e é fechado ao retornar ao layout desktop. Os links de redes sociais continuam acessíveis no menu.

### Mapa interativo

O mapa usa MapLibre GL JS, com estilo do OpenFreeMap e dados do OpenStreetMap. As localidades são convertidas em GeoJSON para renderizar os pontos e seus rótulos.

A interface permite filtrar categorias, aproximar o mapa e selecionar um ponto pela lista ou pelo próprio marcador. A seleção centraliza a localidade e abre um popup. Os dados ficam em um array no JavaScript, separado da lógica de renderização, com campos para coordenadas, categoria e informações adicionais.

As posições de São Miguel do Gostoso e Diogo Lopes foram corrigidas a partir de referências geográficas, registradas em comentários no código.

### Detalhes de serviços

Os sete serviços têm descrições resumidas e conteúdo detalhado em diálogos nativos de HTML. Ao fechar um diálogo, o foco retorna ao controle que o abriu. Links com o identificador de um serviço também podem abrir seus detalhes diretamente.

O conteúdo permanece no HTML; o JavaScript controla a abertura e o preenchimento do diálogo compartilhado.

### Formulário e FAQ

O formulário usa validação nativa, campos obrigatórios e opções de seleção. Após a validação, o JavaScript organiza os dados em uma mensagem e prepara um link para abertura do WhatsApp. O envio é confirmado pelo usuário no aplicativo; os dados não são persistidos pelo site.

O FAQ utiliza os elementos `details` e `summary`, com controle de abertura e animação que respeita a preferência por movimento reduzido. O vídeo institucional usa os controles nativos do navegador.

## Decisões de interface

A identidade visual usa navy como base, azul institucional, ciano e laranja para os destaques, com as fontes Manrope e Inter. Cores, espaçamentos e dimensões compartilhadas são definidos em variáveis CSS.

O hero combina uma fotografia com overlay navy para manter a legibilidade do texto. A navegação e o conteúdo usam o mesmo container. No restante da página, divisórias e espaçamentos organizam as informações; os cards agrupam os serviços e seus controles de acesso aos detalhes.

A implementação inclui link para pular ao conteúdo, nomes acessíveis nos controles, indicadores de foco e estados do menu comunicados por atributos ARIA. Os layouts foram conferidos em desktop e mobile, incluindo telas de 320 px, com atenção a transbordamento horizontal e sobreposição de elementos.

## Tecnologias

| Tecnologia | Aplicação no projeto |
| --- | --- |
| HTML5 | Estrutura semântica, formulários, vídeo e diálogos |
| CSS3 | Tokens de estilo, Flexbox, Grid e media queries |
| JavaScript | Eventos, controle de estado dos componentes e manipulação do DOM |
| MapLibre GL JS | Camadas GeoJSON, filtros, marcadores e navegação do mapa |
| OpenFreeMap e OpenStreetMap | Estilo e dados cartográficos |
| Google Fonts | Carregamento das fontes Manrope e Inter |

A estrutura é estática e dispensa instalação de pacotes ou etapa de build. As fontes e os recursos cartográficos dependem de conexão com a internet.

## Executar localmente

Com Git e Python 3 instalados:

```sh
git clone https://github.com/joaogabrielcode/jbs-solar.git
cd jbs-solar
python3 -m http.server 8000
```

Abra [http://localhost:8000](http://localhost:8000). Encerre o servidor com `Ctrl + C` no terminal.

## Estrutura do repositório

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

O HTML concentra a estrutura e os conteúdos. O CSS define os componentes e os layouts responsivos. O JavaScript reúne as interações e os dados usados pelo mapa.

As pastas locais `docs/`, `refs/` e `design_system/` contêm materiais de referência e estão excluídas do versionamento pelo `.gitignore`.

## Verificação

```sh
node --check js/main.js
git diff --check
```

O comando de verificação de sintaxe requer Node.js. O repositório não possui suíte de testes automatizados configurada.

A revisão no navegador inclui header no topo e durante a rolagem, âncoras, menu mobile, navegação por teclado, diálogos dos serviços, filtros do mapa, popups, FAQ e validação do formulário. As verificações do mapa também conferem as coordenadas renderizadas e a centralização ao selecionar uma localidade.

## Estado atual

O site tem navegação responsiva, mapa interativo e componentes funcionais. O item “Loja JBS” permanece desativado, identificado como “em breve”, até que sua URL seja definida. Os marcadores do mapa representam as localidades; os campos de endereço e rota estão disponíveis para inclusão de dados das unidades.
