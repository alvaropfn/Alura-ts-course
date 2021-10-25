class Negociacao {
  constructor(
    private _data: Date,
    public readonly quantidade: number,
    public readonly valor: number
  ) {}

  public get data(): Date {
    return new Date(this._data.getTime());
  }

  public get volume(): number {
    return this.quantidade * this.valor;
  }

  public static criaDe(
    _data: string,
    _quantidade: string,
    _valor: string
  ): Negociacao {
    const regex = /-/g;
    const date = new Date(_data.replace(regex, ","));
    const quantidade = parseInt(_quantidade);
    const valor = parseFloat(_valor);

    return new Negociacao(date, quantidade, valor);
  }
}

export { Negociacao };
