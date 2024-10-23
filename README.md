# Calculadora JavaScript

Este é um projeto de uma calculadora desenvolvida em JavaScript, capaz de realizar operações matemáticas básicas e avançadas. A interface é gerada dinamicamente através de manipulação do DOM, exibindo os botões e atualizando o visor em tempo real. A calculadora suporta operações como soma, subtração, multiplicação, divisão, raiz quadrada e potência ao quadrado, com um sistema que respeita a ordem de precedência dos operadores.

## Funcionalidades

- **Operações básicas**: Soma (+), subtração (-), multiplicação (x) e divisão (/).
- **Operações avançadas**: Potência ao quadrado (²) e raiz quadrada (√).
- **Comandos**: 
  - **Limpar (C)**: Limpa o visor e reseta a fórmula.
  - **Apagar (⌫)**: Remove o último caractere inserido.
  - **Calcular (=)**: Executa a fórmula atual e exibe o resultado.
- **Exibição em tempo real**: O visor é atualizado com cada entrada de número ou operador.
- **Ordem de precedência**: Respeita a ordem das operações matemáticas (por exemplo, multiplicação e divisão têm maior precedência do que soma e subtração).

## Estrutura do Projeto

- **Array de Símbolos**: O array `simbolos` define os botões e suas funções, separando números, operadores e comandos especiais.
- **Manipulação do DOM**: Os botões da calculadora são criados dinamicamente com `innerHTML`, e o visor é atualizado conforme o usuário interage com a interface.
- **Controle de Entradas**: A função `novaEntrada` diferencia entre números, operadores e comandos especiais, processando cada ação de acordo com o tipo de entrada.
- **Funções Especiais**: Funções como `limpar`, `apagar`, e `calcular` lidam com comandos específicos, como limpar o visor ou apagar o último número.
- **Cálculos com Precedência**: A função `calcular` usa um sistema de precedência de operadores para garantir que operações como multiplicação e divisão sejam realizadas antes de soma e subtração.

## Funções Principais

- **montarTeclado()**: Cria os botões da calculadora dinamicamente.
- **novaEntrada(simbolo, tipo)**: Identifica se o botão pressionado é um número, operador ou comando especial e executa a ação correta.
- **funcoesEspeciais(comando)**: Executa funções como limpar o visor, apagar o último número ou calcular o resultado.
- **formularConta(simbolo, tipo)**: Adiciona os números e operadores na fórmula e atualiza o visor.
- **calcular(formula)**: Resolve a fórmula levando em consideração a precedência dos operadores.
- **operMath(formu, posicao, sinal)**: Realiza o cálculo de uma operação específica (ex: soma, subtração) e atualiza a fórmula com o resultado.

## Como usar

1. Clone este repositório:
   ```bash
   git clone https://github.com/douglas-moura/calculadora-javascript.git
   
2. Abra o arquivo index.html em um navegador para visualizar a calculadora.
3. Interaja com os botões numéricos e operadores para realizar cálculos.
