import { InvalidCompanyParamException } from '../exceptions/invalid-company-param.exception'
import { CompanyProps } from '../types/company.props'
import { ID } from './id'

export class Company {
  private constructor(
    private readonly id: ID,
    private readonly name: string,
    private readonly document: string,
  ) {
    this.validate()
  }

  public static create(props: CompanyProps) {
    return new Company(props.id, props.name, props.document)
  }

  private validate(): void {
    if (
      this.name === undefined ||
      this.name === null ||
      this.name.trim() === ''
    ) {
      throw new InvalidCompanyParamException('Nome')
    }
  }

  getId(): string {
    return this.id.getValue()
  }

  getName(): string {
    return this.name
  }

  getDocument(): string {
    return this.document
  }
}
