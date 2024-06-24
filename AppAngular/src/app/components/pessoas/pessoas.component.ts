import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pessoa } from '../../Pessoa';
import { PessoasService } from '../../pessoas.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  formulario: any;
  tituloFormulario: string = '';
  pessoas?: Pessoa[];
  visibilidadeTabela : boolean = true;
  visibilidadeFormulario : boolean = false;
  pessoaId?: number;
  nomePessoa : any;
  pessoa? : number;
  modalRef! : BsModalRef;
  page: number = 1;
  totalPessoas?: number;

  constructor(private fb: FormBuilder, private pessoasService: PessoasService,
    private modalService : BsModalService , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.pessoasService.PegarTodos().subscribe(resultado => {
      this.pessoas = resultado;
      this.totalPessoas = this.pessoas.length;
    });
  }

  ExibirformularioCadastro(): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = this.fb.group({
      nome: [null],
      sobrenome: [null],
      idade: [null],
      profissao: [null],
      escolaridade: [null]
    });
  }

  ExibirFormularioAtualizacao(pessoaId: number): void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.pessoasService.PegarPeloId(pessoaId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;
      this.formulario =  new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao),
        escolaridade: new FormControl(resultado.escolaridade)
      });
    });
  }

  EnviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;
    if( pessoa.pessoaId > 0){
      this.pessoasService.AtualizarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.toastr.success('Pessoa Atualizada Com sucesso');
        this.pessoasService.PegarTodos().subscribe(registros => {
          this.pessoas = registros;
        });
      });
    }else{
      this.pessoasService.SalvarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        this.toastr.success('Pessoa Inserida Com sucesso');
        this.pessoasService.PegarTodos().subscribe(registros => {
          this.pessoas = registros;
        });
      });
    }
  }

  Voltar():void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(pessoaId: number, nomePessoa : any, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }

  ExcluirPessoa(pessoaId: number){
    this.pessoasService.ExcluirPessoa(pessoaId).subscribe(resultado => {
      this.modalRef.hide();
      this.toastr.success('Pessoa excluída com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros => {
        this.pessoas = registros;
        this.totalPessoas = this.pessoas.length;
      });
    });
  }

  exportPDF(): void {
      const doc = new jsPDF();

      const table = document.getElementById('tabelaPessoas');

      const data = this.pessoas?.map(p => [p.nome, p.sobrenome, p.idade, p.profissao, p.escolaridade]) || [];

      (doc as any).autoTable({
          head: [['Nome', 'Sobrenome', 'Idade', 'Profissão', 'Escolaridade']],
          body: data
      });

      doc.save('pessoas.pdf');
  }
}
