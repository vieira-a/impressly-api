import { Test, TestingModule } from '@nestjs/testing'
import { Company } from '../../../domain/models'
import { DuplicatedResourceException } from '../../../domain/exceptions'
import { CreateCompanyDto } from '../../dto/create-company.dto'
import { CreateCompanyService } from '../create-company.service'
import { CompanyRepository } from '../../interfaces/company.repository'
import { CNPJ, ID } from '@/modules/company/domain/value-objects'

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
    const saveSpy = jest
      .spyOn(mockCompanyRepository, 'save')
      .mockImplementation((company: Company) => Promise.resolve(company))

    const fakeId = ID.create()
    const fakeCnpj = CNPJ.create('32182885000183')

    jest.spyOn(ID, 'create').mockReturnValue(fakeId)
    jest.spyOn(CNPJ, 'create').mockReturnValue(fakeCnpj)

    const companyCreateSpy = jest.spyOn(Company, 'create')

    const result = await service.execute(validCompany)

    expect(mockCompanyRepository.existsByName).toHaveBeenCalledWith(validCompany.name)
    expect(saveSpy).toHaveBeenCalledTimes(1)

    const savedCompany = saveSpy.mock.calls[0][0]
    expect(savedCompany).toBeInstanceOf(Company)
    expect(savedCompany.getName()).toBe(validCompany.name)
    expect(savedCompany.getDocument()).toBe(validCompany.document)

    expect(result).toBe(savedCompany)

    expect(companyCreateSpy).toHaveBeenCalledWith({
      id: fakeId,
      name: validCompany.name,
      document: fakeCnpj,
    })
  })
})
