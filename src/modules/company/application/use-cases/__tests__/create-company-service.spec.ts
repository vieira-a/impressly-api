import { Test, TestingModule } from '@nestjs/testing'
import { Company } from '../../../domain/models'
import { DuplicatedResourceException } from '../../../domain/exceptions'
import { CreateCompanyDto } from '../../dto/create-company.dto'
import { CreateCompanyService } from '../create-company.service'
import { CompanyRepository } from '../../interfaces/company.repository'

describe('CreateCompanyService', () => {
  let service: CreateCompanyService

  const mockCompanyRepository: Partial<CompanyRepository> = {
    existsByName: jest.fn(),
    save: jest.fn((company: Company) => Promise.resolve(company)),
  }

  const validCompany: CreateCompanyDto = {
    name: 'Contoso',
    document: '32182885000183',
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCompanyService,
        {
          provide: 'CompanyRepository',
          useValue: mockCompanyRepository,
        },
      ],
    }).compile()

    service = module.get(CreateCompanyService)
  })

  it('should throw DuplicatedResourceException if company already exists', async () => {
    const existsSpy = jest.spyOn(mockCompanyRepository, 'existsByName').mockResolvedValue(true)
    const saveSpy = jest.spyOn(mockCompanyRepository, 'save')

    await expect(service.execute(validCompany)).rejects.toThrow(DuplicatedResourceException)

    expect(existsSpy).toHaveBeenCalledWith(validCompany.name)
    expect(saveSpy).not.toHaveBeenCalled()
  })

  it('should create and save company with valid params', async () => {
    jest.spyOn(mockCompanyRepository, 'existsByName').mockResolvedValue(false)
    jest
      .spyOn(mockCompanyRepository, 'save')
      .mockImplementation((company: Company) => Promise.resolve(company))

    const result = await service.execute(validCompany)

    expect(mockCompanyRepository.existsByName).toHaveBeenCalledWith(validCompany.name)

    expect(result).toBeInstanceOf(Company)
    expect(result.getName()).toBe(validCompany.name)
    expect(result.getDocument()).toBe(validCompany.document)
  })
})
