# Babel

## Compiladores

> Classicamente, um compilador traduz um programa de uma linguagem textual facilmente entendida por um ser humano para uma linguagem de máquina.

O funcionamento de um compilador pode se dividir em alguns estágios, que serão vistos a seguir

## Análise léxica (tokenization)

Transforma cada pedaço de código (keywords) em uma token, dizendo o que elas representam individualmente

## Análise sintática (parsing)

Acha a relação entre essas tokens

## Transformation

Pega o código parseado e prevê um "passo a passo" de como executar ele

## Code generation

Finalmente executa o código usando esse passo a passo e gera seu output

## No contexto do Babel

- A análise léxica é feita pelo `@babel/parser` (anteriormente chamado de `babylon`), que é um fork de outro parser chamado `acorn`
- A análise sintática também é feita pelo `@babel/parser`, e irá transformar essas tokens em AST (Abstract Syntax Tree)
- No estágio de transformation é onde serão rodados todos os plugins que alteram de alguma forma o AST (essa é a parte que mais nos interessa)
- No estágio de code generation o Babel pega o código gerado e retorna isso como uma string de código pra ser escrita em disco (é aqui que os sourcemaps são adicionados também, caso estejam ativos)

## Um pouco sobre AST

- Mostrar exemplo básico de `console.log('hello world')` usando [esse site](https://resources.jointjs.com/demos/javascript-ast)
- Mostrar exemplo um pouco mais avançado usando o [AST Explorer](https://astexplorer.net/)
- Quem usa AST
  - VSCode usa para análise de código e refatorações automáticas
  - ESLint usa para verificar regras (mostrar essa [regra simples](https://github.com/michellocana/eslint-plugin-just-why/blob/master/src/rules/NoTodoComment.js) como exemplo)
  - Prettier usa para ler e formatar o nosso código
  - TypeScript/Flow usam para fazer checagem de types
  - GraphQL usa para transformar a sintáxe deles em parâmetros e mandar pro provider de dados
  - Babel

## Escrevendo um plugin básico de transformation com babel

## Mostrar time travel do Babel REPL

## Como funciona o babel-plugin-jsx-auto-test-id

- Mostrar um [exemplo de uso básico do plugin](https://babeljs.io/repl#?browsers=&build=&builtIns=usage&spec=true&loose=true&code_lz=GYVwdgxgLglg9mABAFQKYGcoAoCUiDeAUIogE6pQilIA8AJjAG6Ix0C8ARALYCeAtFAxQ-rDogD0APkIBfIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=true&sourceType=module&lineWrap=true&presets=env%2Creact%2Cenv&prettier=false&targets=&version=7.9.0&externalPlugins=babel-plugin-jsx-auto-test-id%401.0.5)

## Referências

- https://medium.com/@kosamari/how-to-be-a-compiler-make-a-compiler-with-javascript-4a8a13d473b4
- https://github.com/jamiebuilds/babel-docs/blob/master/en_US/authors/basics/stages-of-babel.md
- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
- https://pt.wikipedia.org/wiki/Compilador
