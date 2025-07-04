import { randomUUID } from 'crypto'
import { InvalidCompanyParamException } from '../exceptions/invalid-company-param.exception'

export class ID {
  private readonly id: string

  private constructor(id: string) {
    this.id = id
    this.validate()
  }

  public static create(): ID {
    return new ID(randomUUID())
  }

  getValue(): string {
    return this.id
  }

  public static from(value: string): ID {
    return new ID(value)
  }

  private validate(): void {
    if (this.id === undefined || this.id === null || this.id.trim() === '') {
      throw new InvalidCompanyParamException('ID')
    }
  }
}
