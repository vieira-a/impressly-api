import { InvalidCompanyParamException } from '../../exceptions'
import { CompanyProps } from '../../types/company.props'
import { CNPJ, ID } from '../../value-objects'
import { Company } from '../company'

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
})
