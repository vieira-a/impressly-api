import { Company } from '../../domain/models'

export interface CompanyRepository {
  existsByName(name: string): Promise<boolean>
  save(company: Company): Promise<Company>
}
