# JBS Solar

Landing page estática em HTML, CSS e JavaScript, sem etapa de build ou dependências de produção.

## Executar localmente

```sh
python -m http.server 8000
```

Abra `http://localhost:8000`.

## Organização

- `index.html`: hero, sobre, serviços, loja, processo, projetos, orçamento, FAQ, CTA final e footer.
- `css/style.css`: tokens do design system, componentes compartilhados e regras responsivas.
- `js/main.js`: navegação, accordion de serviços, animações de entrada e ano do footer.

O identificador `solucoes` foi mantido na seção Serviços para preservar os links existentes.

Cada serviço usa `<details data-service-item>` com identificador `servico-<chave>`, um `<summary>` e conteúdo diretamente no HTML. O JavaScript permite apenas um item expandido por vez, anima abertura e fechamento em 250 ms e preserva a operação por teclado. Sem JavaScript, a expansão usa o comportamento nativo de `<details name="servicos">`. Links diretos para serviços também abrem o item correspondente com JavaScript.

Os serviços entram na viewport com fade e subida de 12 px em 400 ms. O stagger é de 60 ms entre itens que entram juntos, limitado a 180 ms. A preferência por movimento reduzido desativa as animações. Cliques rápidos e redimensionamento interrompem ou finalizam a transição sem travar o conteúdo.

A fonte factual dos serviços é [`docs/jbs-servicos-base.md`](docs/jbs-servicos-base.md). Cinco serviços possuem detalhes documentados; carregador de carro elétrico, sistema de bombeamento e parceria aguardam confirmação de conteúdo. “Seja Parceiro” aparece separadamente abaixo da lista, com link para a seção de orçamento. Os projetos usam conteúdo provisório. A loja aguarda o endereço oficial. O formulário e seu botão estão desabilitados até a implementação do envio; não há integração com WhatsApp nem confirmação de recebimento de dados.

## Verificação

Não há comandos de build, lint ou suíte de testes configurados. Verificações básicas disponíveis:

```sh
node --check js/main.js
git diff --check
```

Ao alterar a estrutura ou interações, verificar no navegador: âncoras, menu móvel, FAQ, abertura e fechamento dos sete serviços com clique/Enter/Espaço, exclusividade de abertura, cliques rápidos, redimensionamento durante a animação, preferência por movimento reduzido, funcionamento sem JavaScript, links diretos dos serviços, CTAs e ausência de transbordamento em telas pequenas.
