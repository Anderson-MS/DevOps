export class Pessoa {
  pessoaId: number;
  nome: string;
  sobrenome: string;
  idade: number;
  profissao: string;
  escolaridade : string;

  constructor(pessoaId: number, nome: string, sobrenome: string, idade: number, profissao: string,  escolaridade : string) {
    this.pessoaId = pessoaId;
    this.nome = nome;
    this.sobrenome = sobrenome;
    this.idade = idade;
    this.profissao = profissao;
    this.escolaridade =escolaridade;
  }
}
