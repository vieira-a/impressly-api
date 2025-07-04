import { InvalidCompanyParamException } from '../exception/invalid-company-param.exception'

export type CompanyProps = {
  id: string
  name: string
  document: string
}

export class Company {
  private constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly document: string,
  ) {
    this.validate()
  }

  public static create(props: CompanyProps) {
    return new Company(props.id, props.name, props.document)
  }

  validate() {
    if (
      this.name === undefined ||
      this.name === null ||
      this.name.trim() === ''
    ) {
      throw new InvalidCompanyParamException('Nome')
    }
  }
}
