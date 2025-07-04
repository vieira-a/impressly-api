import { Inject, Injectable } from '@nestjs/common'
import { CompanyRepository } from '../interfaces/company.repository'
import { DuplicatedResourceException } from '../../domain/exceptions'
import { Company } from '../../domain/models'
import { CreateCompanyDto } from '../dto/create-company.dto'
import { CNPJ, ID } from '../../domain/value-objects'

@Injectable()
export class CreateCompanyService {
  constructor(
    @Inject('CompanyRepository')
    private readonly repository: CompanyRepository,
  ) {}
  async execute(input: CreateCompanyDto): Promise<Company> {
    const companyExists = await this.repository.existsByName(input.name)

    if (companyExists) {
      throw new DuplicatedResourceException('Nome')
    }

    const company = Company.create({
      id: ID.create(),
      name: input.name,
      document: CNPJ.create(input.document),
    })

    return await this.repository.save(company)
  }
}
