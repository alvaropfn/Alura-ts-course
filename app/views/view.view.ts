export abstract class View<T> {
  protected elemento: HTMLElement;
  private escapar: boolean = false;

  constructor(seletor: string, escapar?: boolean) {
    const elemento = document.querySelector(seletor);

    if (elemento) this.elemento = elemento as HTMLElement;
    else throw Error(`o seletor: ${seletor} nao retornou nenhum elemento`);

    this.escapar = escapar ? escapar : this.escapar;
  }

  protected abstract template(model: T): string;

  update(model: T): void {
    let template = this.template(model);

    if (this.escapar) {
      template = template.replace(/<script>[\s\S]*?<\/script>/, "");
    }
    this.elemento.innerHTML = template;
  }
}
