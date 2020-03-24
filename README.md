# Babel

## Básico sobre compiladores

Compiladores tem basicamente 3 estágios:

- Parsing
- Transformation (aqui que entra o babel)
- Code generation

## Análise léxica

Transforma strings (nosso código) em tokens

## Análise sintática

Transforma essas tokens em ast

## AST

- Mostrar exemplo básico de console.log('hello world') usando esse site https://resources.jointjs.com/demos/javascript-ast
- Mostrar exemplo um pouco mais avançado usando o https://astexplorer.net/
- Quem usa AST
  - VSCode usa para análise de código e refatorações automáticas
  - ESLint usa para verificar regras (mostrar isso https://github.com/michellocana/eslint-plugin-just-why/blob/master/src/rules/NoTodoComment.js)
  - Prettier usa para ler e formatar o nosso código
  - TypeScript/Flow usam para fazer checagem de types
  - GraphQL usa para transformar a sintáxe deles em parâmetros e mandar pro provider de dados
  - Babel

## Babel

- Escrevendo um plugin básico de transformation com babel
- Como funciona o babel-plugin-jsx-auto-test-id
- Por que a gente precisa atualizar o babel pra usar novas features do Ecmascript
