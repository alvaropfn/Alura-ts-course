import { Negociacoes } from "../models/negociacoes.model.js";

import { View } from "./view.view.js";

export class NegociacoesView extends View<Negociacoes> {
  protected template(model: Negociacoes): string {
    return `
      <table class="table table-hover table-bordered">
        <thread>
          <tr>
            <th>DATA</th>
            <th>QUANTIDADE</th>
            <th>VALOR</th>
          </tr>
          <tbody>
            ${model
              .lista()
              .map((negociacao) => {
                return ` 
                <tr>
                  <td>
                    ${this.formatarData(negociacao.data)}
                  </td>
                  <td>${negociacao.quantidade}</td>
                  <td>${negociacao.valor}</td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </thread>
      </table>
    `;
  }

  private formatarData(data: Date): string {
    return new Intl.DateTimeFormat().format(data);
  }
}
