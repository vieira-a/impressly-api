import { randomUUID } from 'crypto'
import { InvalidCompanyParamException } from '../../exceptions'

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

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (typeof this.id !== 'string' || !uuidRegex.test(this.id)) {
      throw new InvalidCompanyParamException('ID')
    }
  }
}
