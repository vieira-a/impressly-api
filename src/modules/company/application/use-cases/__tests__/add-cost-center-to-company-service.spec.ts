import { Test, TestingModule } from '@nestjs/testing'
import { CNPJ, ID } from '../../../domain/value-objects'
import { Company } from '../../../domain/models'
import { CompanyRepository } from '../../interfaces/company.repository'
import { AddCostCenterToCompanyService } from '../add-cost-center-to-company.service'

describe('AddCostCenterToCompanyService', () => {
  let service: AddCostCenterToCompanyService
  let company: Company

  const mockCompanyRepository: Partial<CompanyRepository> = {
    existsByName: jest.fn(),
    save: jest.fn((company: Company) => Promise.resolve(company)),
    findById: jest.fn(),
  }

  beforeEach(async () => {
    jest.clearAllMocks()

    company = Company.create({
      id: ID.create(),
      name: 'Contoso',
      document: CNPJ.create('32182885000183'),
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddCostCenterToCompanyService,
        {
          provide: 'CompanyRepository',
          useValue: mockCompanyRepository,
        },
      ],
    }).compile()

    service = module.get(AddCostCenterToCompanyService)
  })

  it('should add a valid CostCenter successfully', async () => {
    jest.spyOn(mockCompanyRepository, 'findById').mockResolvedValue(company)

    const saveSpy = jest.spyOn(mockCompanyRepository, 'save').mockResolvedValue(company)

    const addCostCenterSpy = jest.spyOn(company, 'addCostCenter')

    const result = await service.execute(company.getId().getValue(), 'Financial')

    expect(mockCompanyRepository.findById).toHaveBeenCalledWith(company.getId().getValue())
    expect(addCostCenterSpy).toHaveBeenCalled()
    expect(company.getCostCenters()).toHaveLength(1)
    expect(company.getCostCenters()[0].getName()).toBe('Financial')
    expect(saveSpy).toHaveBeenCalledWith(company)
    expect(result).toBe(company)
  })
})
