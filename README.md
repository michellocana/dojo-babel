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

- Mostrar exemplo básico usando [esse site](https://resources.jointjs.com/demos/javascript-ast)
  - `const foodsILike = ['hamburger', 'pizza', 'hotdog']`
- Quem usa AST
  - VSCode usa para análise de código e refatorações automáticas
  - ESLint usa para verificar regras
  - Prettier usa para ler e formatar o nosso código
  - TypeScript/Flow usam para fazer checagem de types
  - GraphQL usa para transformar a sintáxe deles em parâmetros e mandar pro provider de dados
  - Babel

## Escrevendo um [plugin básico](https://astexplorer.net/#/gist/9abad0ad0f2d36c6975bc9f2ad205408/16c1f78b47a05126904b280c01983e5eaedb111c) de transformation com babel

```js
export default function() {
  const foodEmojis = {
    hamburger: "🍔",
    pizza: "🍕",
    hotdog: "🌭"
  };

  return {
    name: "food-string-to-emoji",
    visitor: {
      StringLiteral(path) {
        if (foodEmojis[path.node.value]) {
          path.node.value = foodEmojis[path.node.value];
        }
      }
    }
  };
}
```

### Input:

```js
const foodsILike = ["hamburger", "pizza", "hotdog"];

console.log(foodsILike);
```

### Output:

```js
Array(3)[("🍔", "🍕", "🌭")];
```

## Como funciona o babel-plugin-jsx-auto-test-id

- Ele [adiciona um atributo data-test](https://babeljs.io/repl#?browsers=&build=&builtIns=usage&spec=true&loose=true&code_lz=GYVwdgxgLglg9mABAEQE4EMDuBBAwjVCAGwFMAVEKOVGdIgCgEpEBvAKEUVRKhFSXodOiADwgiAPiHDRRGBLRZE6RAAsQAW3RJVJdABMRAejlSZnEaYCiGAM4lEtuBof6e6GEVvHT04ZfkyXW4ALmVECAJiEh95P2NxM0RGNgBfIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cenv&prettier=false&targets=&version=7.9.0&externalPlugins=babel-plugin-jsx-auto-test-id%401.0.5) no elemento host de um component para suprir a falta de ids que a automação/GTM precisa

### Funcionamento básico do plugin

- [Passo 1](https://astexplorer.net/#/gist/6067fef835b09535e68d175c3cd36032/24dfd51e22a34c2b8eaf796deafd38a4a4bcb701): Encontrar a função que declara o component e adicionar o nome dela como atributo
- [Passo 2](https://astexplorer.net/#/gist/354925d680565a6dfdeaa70c19da10de/8e961be1fe131402f39160a2b2d37fb533f34918): Adicionar o atributo somente no elemento host do component

### Funcionamento avançado

- Passo 3: Adicionar atributo em outras formas de components (component com arrow function, component de classe)
- Passo 4: Aceitar um nome de atributo customizado
- Passo 5: Não adicionar atributo em functions dentro de functions (por exemplo, em um Array.map dentro do component)
- Passo 6: Não adicionar atributo em components em que o host é um React.Fragment, pois eles não aceitam atributos

## Time travel do Babel REPL
Mostra o [passo a passo](https://babeljs.io/repl#?browsers=&build=&builtIns=usage&spec=true&loose=true&code_lz=GYVwdgxgLglg9mABAEQE4EMDuBBAwjVCAGwFMAVEKOVGdIgCgEpEBvAKEUVRKhFSXodOiADwgiAPiHDRRGBLRZE6RAAsQAW3RJVJdABMRAejlSZnEaYCiGAM4lEtuBof6e6GEVvHT04ZfkyXW4ALmVECAJiEh95P2NxM0RGNgBfIA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=true&sourceType=module&lineWrap=true&presets=env%2Creact%2Cenv&prettier=false&targets=&version=7.9.0&externalPlugins=babel-plugin-jsx-auto-test-id%401.0.5) que o Babel fez até gerar o código final

## Referências

- https://medium.com/@kosamari/how-to-be-a-compiler-make-a-compiler-with-javascript-4a8a13d473b4
- https://github.com/jamiebuilds/babel-docs/blob/master/en_US/authors/basics/stages-of-babel.md
- https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md
- https://pt.wikipedia.org/wiki/Compilador
