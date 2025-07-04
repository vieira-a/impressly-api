import { InvalidCompanyParamException } from '../exception/invalid-company-param.exception'

type CompanyProps = {
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
    this.id = id
    this.document = document
    this.name = name
    this.validate()
  }

  public static create(props: CompanyProps) {
    return new Company(props.id, props.name, props.document)
  }

  validate() {
    if (this.name === '') {
      throw new InvalidCompanyParamException('Nome')
    }
  }
}
