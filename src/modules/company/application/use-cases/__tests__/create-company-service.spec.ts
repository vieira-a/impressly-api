import { CreateCompanyDto } from '../../dto/create-company.dto'
import { CompanyRepository } from '../../interfaces/company.repository'
import { CreateCompanyService } from '../create-company.service'
import { DuplicatedResourceException } from '@/modules/company/domain/exceptions'

describe('CreateCompanyService', () => {
  let repository: CompanyRepository
  let service: CreateCompanyService

  const createCompanyDto: CreateCompanyDto = {
    name: 'Contoso',
    document: '32182885000183',
  }

  beforeEach(() => {
    repository = {
      existsByName: jest.fn(),
      save: jest.fn(),
    } as unknown as CompanyRepository

    service = new CreateCompanyService(repository)
  })

  it('should throw DuplicatedResourceException if company already exists', async () => {
    const existsSpy = jest.spyOn(repository, 'existsByName').mockResolvedValue(true)
    const saveSpy = jest.spyOn(repository, 'save')

    await expect(service.execute(createCompanyDto)).rejects.toThrow(DuplicatedResourceException)

    expect(existsSpy).toHaveBeenCalledWith(createCompanyDto.name)
    expect(saveSpy).not.toHaveBeenCalled()
  })
})
