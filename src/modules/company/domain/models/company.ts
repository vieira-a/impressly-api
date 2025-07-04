import { InvalidCompanyParamException } from '../exceptions'
import { CompanyProps } from '../types/company.props'
import { CNPJ, ID } from '../value-objects'
import { BaseModel } from './base'

export class Company extends BaseModel<ID> {
  private readonly name: string
  private readonly document: CNPJ

  private constructor(
    id: ID,
    name: string,
    document: CNPJ,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt)
    this.name = name
    this.document = document
    this.validate()
  }

  public static create(props: CompanyProps): Company {
    const now = new Date()
    return new Company(props.id, props.name, props.document, now, now, null)
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
