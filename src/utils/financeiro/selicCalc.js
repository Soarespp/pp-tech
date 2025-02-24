export function calcularRendimentoMensalSelic(valorInvestido, taxaSelicAtual) {
  // Converter taxa anual para decimal
  let taxaAnual = taxaSelicAtual / 100;

  // Calcular a taxa mensal equivalente
  let taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;

  // Calcular o rendimento mensal
  let rendimentoMensal = valorInvestido * taxaMensal;

  return rendimentoMensal.toFixed(2); // Retorna o valor formatado com 2 casas decimais
}
