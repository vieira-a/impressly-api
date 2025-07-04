import { DuplicatedResourceException, InvalidCompanyParamException } from '../exceptions'
import { CompanyProps } from '../types/company.props'
import { CNPJ, ID } from '../value-objects'
import { BaseModel, CostCenter, Departament } from './'

export class Company extends BaseModel<ID> {
  private readonly name: string
  private readonly document: CNPJ
  private readonly costCenter: CostCenter[] = []
  private readonly departament: Departament[] = []

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

  public addCostCenter(costCenter: CostCenter): void {
    const costCenterAlreadyExists = this.costCenter.some(
      (cc) => cc.getName().toLowerCase() === costCenter.getName().toLowerCase(),
    )

    if (costCenterAlreadyExists) {
      throw new DuplicatedResourceException('Nome')
    }

    this.costCenter.push(costCenter)
  }

  public addDepartament(departament: Departament): void {
    const departamentAlreadyExists = this.departament.some(
      (dep) => dep.getName().toLowerCase() === departament.getName().toLowerCase(),
    )

    if (departamentAlreadyExists) {
      throw new DuplicatedResourceException('Departamento')
    }
    this.departament.push(departament)
  }

  getName(): string {
    return this.name
  }

  getDocument(): string {
    return this.document.getValue()
  }

  getCostCenters(): CostCenter[] {
    return [...this.costCenter]
  }

  getDepartaments(): Departament[] {
    return [...this.departament]
  }
}
