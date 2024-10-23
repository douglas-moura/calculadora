// array global que recebe todos os parâmetros (números e operadores) da conta
let formula = []
// elemento DOM visor da calculadora
const visor = document.getElementById('visor')
// símbolos do teclado da calculadora
const simbolos = [
	{icon: "letter-c", tipo: "comando", valor: "limpar"},
	{icon: "backspace", tipo: "comando", valor: "apagar"},
	{icon: "math", tipo: "operacao", valor: "√"},
	{icon: "divide", tipo: "operacao", valor: "/"},
	{icon: "number-1", tipo: "caractere", valor: 1},
	{icon: "number-2", tipo: "caractere", valor: 2},
	{icon: "number-3", tipo: "caractere", valor: 3},
	{icon: "x", tipo: "operacao", valor: "x"},
	{icon: "number-4", tipo: "caractere", valor: 4},
	{icon: "number-5", tipo: "caractere", valor: 5},
	{icon: "number-6", tipo: "caractere", valor: 6},
	{icon: "minus", tipo: "operacao", valor: "-"},
	{icon: "number-7", tipo: "caractere", valor: 7},
	{icon: "number-8", tipo: "caractere", valor: 8},
	{icon: "number-9", tipo: "caractere", valor: 9},
	{icon: "plus", tipo: "operacao", valor: "+"},
	{icon: "number-2-small", tipo: "operacao", valor: "²"},
	{icon: "number-0", tipo: "caractere", valor: 0},
	{icon: "wifi-0", tipo: "caractere", valor: "."},
	{icon: "equal", tipo: "comando", valor: "calcular"},
]

// chamada ao carregar a página
const montarTeclado = () => {
	// para cada elemento no array de símbolos, um botão é criado na calculadora
	for (let i = 0; i < simbolos.length; i++) {
		document.getElementById('teclado').innerHTML += 
			// há operador ternário aqui ao criar o elemento do botão feito exclusivamente para aplicar estilo ao botão do elevado ao quadrado "²"
			`<span onclick='novaEntrada("${simbolos[i].valor}", "${simbolos[i].tipo}")' class="calc-btn ${simbolos[i].valor == '²' ? '-mt-4 text-base' : ''}">
				<iconify-icon icon="tabler:${simbolos[i].icon}"></iconify-icon>
			</span>`
	}
}

// função chamada quando qualquer botão do teclado é clicado
/*
	ela identifica se é um botão é para formar a conta (número ou operador)
	ou um comando especial (apagar, limpar visor ou calcular)
*/
const novaEntrada = (simbolo, tipo) => {
	if (tipo == "comando") {
		funcoesEspeciais(simbolo)
	} else {
		formularConta(simbolo, tipo)
	}
}

// após definir se tratar de um comando, o SWITCH define qual comando executar de acordo com o atributo "valor" do comando
const funcoesEspeciais = (comando) => {
	switch (comando) {
		case 'limpar':
			// FUNÇÃO DO BOTÃO C NO TECLADO
			// esvaziar conteúdo do visor e o array da fórmula
			visor.innerText = ''
			formula.length = 0
			break
		case 'apagar':
			// apagar último caractere da fórmula (visor e array)
			apagar(formula)
			break
		case 'calcular':
			// calcular resultado
			calcular(formula)
			break
		default:
			// caso o comando não seja reconhecido (improvavel), o default exibe 'ERRO' no visor e destrói a conta
			visor.innerText = 'ERRO'
			formula.length = 0
	}
}

// após definir se tratar de um símbolo, a função abaixo é executada
const formularConta = (simbolo, tipo) => {
	// a variável index pega o item anterior presente na array da fórmula
	let index = formula.length - 1
	// checa se o item anterior é um tipo caractere (número inteiro, real ou ponto)
	if (tipo == 'caractere') {
		// checamos se o array está vazio
		if (formula.length <= 0) {
			// caso seja TRUE, o caractere é inserido como o primeiro do array, dando inicio a conta
			formula.push(parseInt(simbolo))
		} else {
			// caso seja FALSE, isso indica que é uma fórmula já em andamento
			// checamos se o elemento anterior do array da fórmula é um número
			/*
				isto serve para sabermos se o usuário esta compondo
				um número com mais de 2 caracteres (>=10) ou se é o
				início de um número novo após um operador
			*/
			if (typeof formula[index] == 'number') {
				// caso seja TRUE, o novo simbolo (String) é unido ao número anterior (Number)
				let novoNumero = formula[index] += simbolo
				/*
					há um operador ternário aqui para checar se o número
					anterior possui um ponto, significando que é um
					número real, caso haja, o novo número é mantido
					como String para receber valor após o ponto, senão,
					a String é convertida em Int
				*/
				formula[index] = simbolo == "." ? novoNumero : parseInt(novoNumero)
			} else if (formula[index].length > 1) {
				// este ELSE IF checa se o número anterior na array possui mais 1 caractere (o segundo é o ponto)
				// caso seja TRUE, o novo simbolo (String) é unido ao número anterior (também String)
				let novoNumero = formula[index] += simbolo
				// após isto, o novo número Real é convertido em Float e inserido no array da fórmula
				formula[index] = parseFloat(novoNumero)
			} else {
				// caso ambas acima sejam FALSE, isto indicado que se trata de um novo número após um operador
				// o novo número (símbolo) simplesmente é convertido em Int e inserido ao final do array da fórmula
				formula.push(parseInt(simbolo))
			}
		}
	} else {
		// se chegamos aqui, é porque o IF (tipo == 'caractere') é FALSE, significando que se trata de um operador matemático
		// neste caso, o operador (símbolo) é inserido como String ao final do array da fórmula
		formula.push(simbolo)
	}
	// ao final de toda chegagem, o símbolo é mostrado no visor, independe do resultadodos IFs
	visor.innerText += simbolo
}

// FUNÇÃO DO BOTÃO BACKSPACE NO TECLADO
const apagar = (formula) => {
	// seleciona o ultimo elemento do array da fórmula e salva na variável
	let ultimoCrt = formula[formula.length - 1]
	// checa se o ultimo elemento náo é um número ou se é um número inteiro menor que 10
	// este IF serve para isolar o elementos com um unico caractere
	if (typeof ultimoCrt != 'number' || (Number.isInteger(ultimoCrt) && ultimoCrt < 10)) {
		// caso seja TRUE, o elemento simplesmenteé removido do final do array da fórmula
		formula.pop()
	} else {
		// caso seja FALSE, isto indica que se trata de um número maior que 10 ou um número Real
		// neste caso o número é convertido em String
		let numText = ultimoCrt.toString()
		/*
			a remoção do ultimo caractere é feita na String com o slice(0, -1)
			o operador ternário aqui é ultilizado para checar se há a presença de um ponto na String
			com isto podemos definir se o novo número será convertido novamente de String para Int ou Float
		*/
		let novoNum = numText.includes('.') ? parseFloat(numText.slice(0, -1)) : parseInt(numText.slice(0, -1))
		// após isto, o novo número é inserido no lugar do último caracetere
		formula[formula.length - 1] = novoNum
	}
	// ao final das checagens, o ultimo caracetere do conteúdo do elemento visor também é removido com o slice(0, -1)
	visor.innerText = visor.innerText.slice(0, -1)
}

// FUNÇÃO DO BOTÃO IGUAL NO TECLADO
const calcular = (formula) => {
	// array para definir a ordem de prescedência
	let operadores = ['²', '√', '/', 'x', '+', '-']
	// calcularFormula recebe a array da fórmula no estado em que o botão Igual é pressionado
	let calcularFormula = formula
	// este for percorre cada operador da array de operadores para calcular cada ocorrência do operador em questão dentro da array da fórmula
	for (let i = 0; i < operadores.length; i++) {
		// checa se o atual operador esta presente na fórmula
		if(formula.includes(operadores[i])) {
			// caso seja TRUE, a variável calcularFormula é sobrescrita com uma nova array retornada da função operMath()
			do {
				/*
					a função operMath recebe como parâmetros:
					FORMU (array calcularFormula em seu estado atual)
					POSICAO (a posição index do operador atual dentro da array)
					SINAL (o operador em questão)
				*/
				calcularFormula = operMath(
					calcularFormula,
					calcularFormula.indexOf(operadores[i]),
					operadores[i]
				)
			// a cada chamada do operMath, ele atualiza calcularFormula resolvendo a fórmula conta por conta
			// esta chamada acontece enquanto (WHILE) houver o operador atual na fórmula
			// assim que todas as contas com o operador forem resolvidas, o DO se encerra e o FOR chama o próximo operador
			} while (calcularFormula.includes(operadores[i]))
		}
	}
	// chegamos aqui assim que todos os operadores do array de operadores forem resolvidos dentro do array calcularFormula
	// o valor final restante na array calcularFormula é passado para resultadoFinal
	const resultadoFinal = calcularFormula[0]
	// o array global formula é reduzido para 1 para comportar apenas um valor e então revebe o resultadoFinal
	formula.length = 1
	formula[0] = resultadoFinal
	// o resultadoFinal é inserido no conteúdodo visor após uma checagem de erro
	visor.innerHTML = isNaN(resultadoFinal) ? 'ERRO' : resultadoFinal
}

// FUNÇÃO DE CALCULOS BÁSICOS
const operMath = (formu, posicao, sinal) => {
	/*
		com o parâmetro posicao podemos identificar o operador e a conta
		em questão assim como seus números a direita e a esquerda e então
		salva-los nas variáveis n1 (esquerda) e n2 (direita)
	*/
	let n1 = formu[posicao - 1]
	let n2 = formu[posicao + 1]
	let result = null
	// o SWITCH abaixo identifica qual a operação matemática de acordo com o sinal
	// com isto n1 e n2 são calculados e então passados para a variável result
	switch (sinal) {
		case '+':
			result = n1 + n2
			break
		case '-':
			result = n1 - n2
			break
		case 'x':
			result = n1 * n2
			break
		case '/':
			result = n1 / n2
			break
		case '√':
			result = Math.sqrt(n2)
			break
		case '²':
			result = n1 * n1
			break
		default:
			// caso o sinal não seja indentificado (improvavel), result recebe #
			result = '#'
	}
	// ETAPA IMPORTANTE
	// o result é inserido na array formu recebida como parâmetro NO LUGAR DO OPERADOR QUE CORRESPONDIA A ESTA CONTA
	formu[posicao] = result
	// em seguida, os valores de n1 e n2 são removidos da array formu pois já foram calculados
	// Excessões: caso seja uma raiz quadrada, n1 não é removido, e caso seja uma potência, n2 não é removido
	if(n1 != undefined && sinal != '√') formu.splice(formu.indexOf(n1), 1)
	if(n2 != undefined && sinal != '²') formu.splice(formu.indexOf(n2), 1)
	/*
		com isto, a função retorna um array com uma parte da
		fórmula resolvida, onde o operador e os números se tornaram
		um.único valor da posição correta, sem a afeta a posição
		das demais operacões na ordem.de prescedência
	*/
	return formu
}

// chamada de função ao carregar página
// mostar teclado da calculadora
montarTeclado()