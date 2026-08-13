# Acolhe POA

Crie uma aplicação web mobile-first chamada AcolhePOA, com aparência e experiência de um aplicativo para dispositivos móveis.

Objetivo

O AcolhePOA tem como objetivo facilitar o acesso da população a informações sobre locais de acolhimento para pessoas em situação de rua em Porto Alegre.

A função principal é mostrar uma lista de locais de acolhimento e informar de maneira extremamente simples a situação de disponibilidade:

🟢 Vagas disponíveis

🔴 Sem vagas

🟡 Não informado

Tbm coloque a opção se aceita animais de estimação ou pets , coloque todos como não informados por enquanto, 

O aplicativo NÃO deve informar quantidade de vagas. A ideia é evitar a necessidade de atualização constante de números e tornar a informação simples e objetiva.

IMPORTANTE: os dados de disponibilidade utilizados inicialmente são apenas dados demonstrativos para protótipo. Não apresentar os status simulados como dados oficiais ou em tempo real.

Tecnologias e arquitetura

Use React + TypeScript + Ionic React como base da interface.

Quero que o Ionic seja utilizado de maneira real e significativa, e não apenas instalado como dependência.

Utilize componentes oficiais do Ionic sempre que forem apropriados, incluindo, quando fizer sentido:

IonApp

IonReactRouter

IonRouterOutlet

IonPage

IonHeader

IonToolbar

IonTitle

IonContent

IonFooter

IonList

IonItem

IonLabel

IonCard

IonCardHeader

IonCardTitle

IonCardContent

IonButton

IonIcon

IonSearchbar

IonSegment

IonSegmentButton

IonBadge

IonChip

IonModal

IonToast

IonAlert

IonLoading

Não substitua indiscriminadamente os componentes Ionic por componentes HTML comuns ou por outra biblioteca de UI.

A interface deve parecer um aplicativo mobile moderno, limpo e acessível.

Prepare a estrutura para funcionar como PWA.

Não implemente login ou autenticação nesta primeira versão.

Não implemente painel administrativo ainda.

Porém, organize o código de forma que futuramente seja possível adicionar uma área autenticada para as instituições atualizarem a situação das vagas.

Tela inicial

Criar uma tela inicial chamada "AcolhePOA".

No topo:

nome/logo AcolhePOA

subtítulo: "Encontre locais de acolhimento em Porto Alegre"

Adicionar uma pequena explicação:

"Consulte informações sobre locais de acolhimento e verifique a situação informada por cada unidade."

Criar uma área de busca usando IonSearchbar.

Placeholder:

"Buscar por nome ou bairro"

Criar filtros usando IonSegment:

Todos

Com vagas

Sem vagas

Não informado

Abaixo dos filtros, mostrar a lista de locais.

Cada local deve aparecer em um IonCard ou combinação de IonList/IonItem.

Cada cartão deve mostrar:

nome da instituição

bairro

endereço resumido

status atual

horário de funcionamento, quando disponível

horário da última atualização demonstrativa

botão "Ver detalhes"

Usar IonBadge/IonChip para destacar visualmente o status.

Tela de detalhes

Ao tocar em "Ver detalhes", abrir uma tela utilizando IonPage.

Mostrar:

nome completo

endereço

bairro

telefone, quando disponível

horário

público atendido, quando essa informação estiver disponível

situação atual

última atualização

observações

botão "Ligar"

botão "Como chegar"

O botão "Como chegar" deve abrir o aplicativo de mapas do dispositivo usando uma URL de mapas apropriada.

O botão "Ligar" deve utilizar um link tel:.

Aviso importante

Adicionar no aplicativo um aviso visível:

"Importante: a disponibilidade de vagas pode mudar a qualquer momento. As informações exibidas dependem da atualização realizada pela instituição e não garantem uma vaga ou acolhimento."

Também deixar claro que algumas unidades podem possuir critérios próprios de acesso ou exigir encaminhamento.

Dados iniciais para demonstração

Criar dados locais/mockados para demonstrar o funcionamento do aplicativo.

Utilizar como referência locais de acolhimento mencionados em informações públicas de Porto Alegre.

Cadastrar inicialmente:

Acolher 1

bairro: Floresta

tipo: Albergue

status demonstrativo: Vagas disponíveis

Acolher 2

endereço: Rua Morretes, 345

bairro: Santa Maria Goretti

tipo: Albergue

status demonstrativo: Sem vagas

Acolher 3

bairro: Floresta

tipo: Acolhimento

status demonstrativo: Vagas disponíveis

Albergue Dias da Cruz

bairro: Azenha

tipo: Albergue

status demonstrativo: Sem vagas

Abrigo Municipal Marlene

endereço: Avenida Getúlio Vargas, 40

bairro: Menino Deus

tipo: Abrigo/Albergue

status demonstrativo: Não informado

Abrigo Bom Jesus

endereço: Rua São Domingos, 165

bairro: Bom Jesus

tipo: Abrigo

status demonstrativo: Vagas disponíveis

Abrigo Cônego Paulo De Nadal

endereço: Avenida Padre Cacique, 1372

bairro: Praia de Belas

tipo: Abrigo

status demonstrativo: Não informado

Abrigo João Paulo II

endereço: Estrada Aracaju, 650

bairro: Vila Nova

tipo: Abrigo

status demonstrativo: Não informado

Albergue Acolher 2

endereço: Rua Morretes, 345

bairro: Santa Maria Goretti

tipo: Organização de serviço social / acolhimento

status demonstrativo: Sem vagas

IMPORTANTE:
Os status acima são apenas para demonstração da interface e do funcionamento dos filtros. Não afirmar que representam a situação real atual das unidades.

Se houver informações duplicadas ou conflitantes entre fontes, não inventar dados. Priorizar a estrutura do aplicativo e deixar os campos facilmente editáveis.

Atualização da informação

Mesmo sem implementar login agora, estruturar os dados com campos que permitam futuramente:

status

updatedAt

institutionId

observação

horário

telefone

endereço

públicoAtendido

Criar uma função ou estrutura centralizada para atualizar o status, para que futuramente ela possa ser substituída por dados vindos do banco de dados.

O status deve aceitar somente:

AVAILABLE
FULL
UNKNOWN

Exibir na interface:

AVAILABLE → "Vagas disponíveis"
FULL → "Sem vagas"
UNKNOWN → "Não informado"

Última atualização

Mostrar para cada instituição:

"Atualizado há X minutos"

Para dados demonstrativos, utilizar horários fictícios coerentes.

Se o status estiver "Não informado", deixar isso visualmente claro.

No futuro, se uma instituição não atualizar a informação durante determinado período, o sistema poderá automaticamente mudar para "Não informado". Apenas prepare a estrutura; não é necessário implementar essa regra agora.

Design

Quero um design profissional, simples e acolhedor.

Prioridade absoluta para:

leitura fácil

acessibilidade

botões grandes

bom contraste

navegação simples

funcionamento confortável em telas pequenas

aparência de aplicativo mobile

Evite excesso de elementos decorativos.

Use ícones de forma consistente.

Utilize os padrões de navegação do Ionic.

Navegação

Criar pelo menos:

Início

Detalhes da instituição

Sobre o AcolhePOA

O aplicativo deve funcionar corretamente usando IonReactRouter e IonRouterOutlet.

Tela "Sobre"

Explicar:

"O AcolhePOA é um protótipo de aplicativo criado para facilitar a localização de informações sobre locais de acolhimento em Porto Alegre."

Adicionar:

"Esta versão utiliza dados demonstrativos. A disponibilidade real deve ser confirmada diretamente com a instituição."

Preparação para evolução

NÃO implementar login agora.

Porém, estruturar o projeto para uma futura versão em que cada instituição possa:

fazer login;

visualizar sua unidade;

alterar "Vagas disponíveis" / "Sem vagas";

informar observação;

atualizar telefone, horário e outras informações;

registrar a data/hora da atualização.

A aplicação pública não deve permitir que usuários comuns alterem os dados.

Qualidade do código

Organizar o projeto em componentes reutilizáveis.

Separar:

componentes de interface;

páginas;

tipos/interfaces;

dados mockados;

regras de status;

funções auxiliares.

Evitar colocar toda a aplicação em um único arquivo.

Usar TypeScript adequadamente.

Criar tipos para Institution e AvailabilityStatus.

Adicionar comentários somente onde forem realmente úteis para explicar decisões importantes.

Antes de finalizar, verificar:

navegação funcionando;

filtros funcionando;

busca funcionando;

detalhes funcionando;

botão de telefone funcionando;

botão de mapas funcionando;

layout responsivo;

funcionamento em tela mobile;

ausência de erros no console.

O resultado deve parecer um aplicativo mobile real, utilizando Ionic React de forma efetiva, mas mantendo a possibilidade de execução como PWA.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://acolhe-porto-alegre.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/340860da-a0a6-43f9-ac95-65a915bf52c1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
