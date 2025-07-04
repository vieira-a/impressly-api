import { InvalidCompanyParamException } from '../exceptions'
import { CompanyProps } from '../types/company.props'
import { CNPJ, ID } from '../value-objects'
import { BaseModel } from './base'

export class Company extends BaseModel<ID> {
  private readonly name: string
  private readonly document: CNPJ

  private constructor(id: ID, name: string, document: CNPJ) {
    super(id)
    this.name = name
    this.document = document
    this.validate()
  }

  public static create(props: CompanyProps): Company {
    return new Company(props.id, props.name, props.document)
  }

  private validate(): void {
    if (this.name === undefined || this.name === null || this.name.trim() === '') {
      throw new InvalidCompanyParamException('Nome')
    }
  }

  getName(): string {
    return this.name
  }

  getDocument(): string {
    return this.document.getValue()
  }
}
