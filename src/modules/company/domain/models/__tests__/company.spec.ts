import { DuplicatedResourceException, InvalidCompanyParamException } from '../../exceptions'
import { CompanyProps } from '../../types/company.props'
import { CNPJ, ID } from '../../value-objects'
import { Company, CostCenter, Departament } from '../'
import {} from '../cost-center'

const validCompanyProps: CompanyProps = {
  id: ID.create(),
  name: 'Contoso',
  document: CNPJ.create('32182885000183'),
}

describe('Company Model', () => {
  describe('Params validations', () => {
    const invalidNames = [
      ['', 'empty string'],
      [undefined, 'undefined value'],
      [null, 'null value'],
      ['  ', 'blank spaces'],
    ]

    test.each(invalidNames)(
      'should throw InvalidCompanyParamException when name is %s (%s)',
      (name: string) => {
        expect(() =>
          Company.create({ ...validCompanyProps, name: name as unknown as string }),
        ).toThrow(InvalidCompanyParamException)
      },
    )
  })

  describe('Success case', () => {
    it('should create a Company successfully with valid params', () => {
      const company = Company.create({ ...validCompanyProps })

      expect(company).toBeInstanceOf(Company)
      expect(company.getId().getValue()).toBe(validCompanyProps.id.getValue())
      expect(company.getName()).toBe(validCompanyProps.name)
      expect(company.getDocument()).toBe(validCompanyProps.document.getValue())

      expect(company.getCreatedAt()).toBeInstanceOf(Date)
      expect(company.getUpdatedAt()).toBeInstanceOf(Date)
      expect(company.getDeletedAt()).toBeNull()
    })
  })

  describe('Relations and dependencies', () => {
    it('should add a CostCenter successfully', () => {
      const company = Company.create(validCompanyProps)
      const costCenter = CostCenter.create({ id: ID.create(), name: 'Financial' })

      company.addCostCenter(costCenter)

      const result = company.getCostCenters()
      expect(result).toHaveLength(1)
      expect(result[0].getName()).toBe('Financial')
    })

    it('should not allow duplicate cost center names', () => {
      const company = Company.create(validCompanyProps)
      const costCenter = CostCenter.create({ id: ID.create(), name: 'Financial' })
      const duplicatedCostCenter = CostCenter.create({ id: ID.create(), name: 'Financial' })

      company.addCostCenter(costCenter)
      expect(() => company.addCostCenter(duplicatedCostCenter)).toThrow(DuplicatedResourceException)
    })

    it('should add a Departament successfully', () => {
      const company = Company.create(validCompanyProps)
      const departament = Departament.create({ id: ID.create(), name: 'Support' })

      company.addDepartament(departament)

      const result = company.getDepartaments()
      expect(result).toHaveLength(1)
      expect(result[0].getName()).toBe('Support')
    })
  })
})
