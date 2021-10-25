import { Negociacao } from "../models/negociacao.model.js";
import { Negociacoes } from "../models/negociacoes.model.js";

import { MensagemView } from "../views/mensagem.view.js";
import { NegociacoesView } from "../views/negociacoes.view.js";

import { DiasDaSemana } from "../enums/diasDaSemana.enum.js";

export class NegociacaoController {
  private inputData: HTMLInputElement;
  private inputQuantidade: HTMLInputElement;
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");

  constructor() {
    this.inputData = document.querySelector("#data") as HTMLInputElement;
    this.inputQuantidade = document.querySelector(
      "#quantidade"
    ) as HTMLInputElement;
    this.inputValor = document.querySelector("#valor") as HTMLInputElement;
    this.negociacoesView.update(this.negociacoes);
  }

  public criaNegociacao(): Negociacao {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    return negociacao;
  }

  public adiciona(): void {
    const negociacao: Negociacao = this.criaNegociacao();
    if (this.ehDiaNaoUtil(negociacao.data)) {
      this.mensagemView.update(
        "Negociacies so podem ser cadastradas em dias uteis"
      );
      return;
    }

    this.negociacoes.adiciona(negociacao);
    this.limparFormulario();
    this.atualizaView();
  }

  private ehDiaUtil(data: Date): boolean {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SABADO
    );
  }

  private ehDiaNaoUtil(data: Date): boolean {
    return !this.ehDiaUtil(data);
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private atualizaView(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("negociacao adicionada com sucesso");
  }
}
