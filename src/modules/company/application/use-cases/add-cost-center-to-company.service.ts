import { Inject, Injectable } from '@nestjs/common'
import { CompanyRepository } from '../interfaces/company.repository'
import { CostCenter } from '../../domain/models'
import { ID } from '../../domain/value-objects'

@Injectable()
export class AddCostCenterToCompanyService {
  constructor(
    @Inject('CompanyRepository')
    private readonly repository: CompanyRepository,
  ) {}

  async execute(companyId: string, name: string) {
    const company = await this.repository.findById(companyId)

    const costCenter = CostCenter.create({
      id: ID.create(),
      name,
    })

    if (company) {
      company.addCostCenter(costCenter)
      await this.repository.save(company)
      return company
    }
  }
}
