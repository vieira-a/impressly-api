import { InvalidDocumentException } from '../exceptions'
import { CNPJValidator } from '../validators/cnpj.validator'

export class CNPJ {
  private readonly value: string

  constructor(value: string) {
    this.value = value
    this.validate()
  }

  public static create(value: string): CNPJ {
    return new CNPJ(value)
  }

  getValue(): string {
    return this.value
  }

  private validate(): void {
    const normalized = this.value.replace(/\D/g, '')
    const validator = new CNPJValidator()

    if (!validator.validate(normalized)) {
      throw new InvalidDocumentException(`CNPJ: ${normalized}`)
    }
  }
}
