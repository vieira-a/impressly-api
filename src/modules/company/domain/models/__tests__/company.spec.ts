import { InvalidCompanyParamException } from '../../exceptions/invalid-company-param.exception'
import { CompanyProps } from '../../types/company.props'
import { CNPJ } from '../value-objects/cnpj'
import { Company } from '../company'
import { ID } from '../value-objects/id'

const validCompanyProps: CompanyProps = {
  id: ID.create(),
  name: 'Contoso',
  document: CNPJ.create('32182885000183'),
}

describe('Company Model', () => {
  it('should throw an InvalidCompanyParamException if name is empty', () => {
    expect(() => Company.create({ ...validCompanyProps, name: '' })).toThrow(
      InvalidCompanyParamException,
    )
  })

  it('should throw an InvalidCompanyParamException if name is undefined', () => {
    expect(() =>
      Company.create({
        ...validCompanyProps,
        name: undefined as unknown as string,
      }),
    ).toThrow(InvalidCompanyParamException)
  })

  it('should throw an InvalidCompanyParamException if name is null', () => {
    expect(() =>
      Company.create({
        ...validCompanyProps,
        name: null as unknown as string,
      }),
    ).toThrow(InvalidCompanyParamException)
  })

  it('should throw an InvalidCompanyParamException if name is only spaces', () => {
    expect(() =>
      Company.create({
        ...validCompanyProps,
        name: '  ',
      }),
    ).toThrow(InvalidCompanyParamException)
  })

  it('should create a Company successfully with valid params', () => {
    const company = Company.create({ ...validCompanyProps })

    expect(company).toBeInstanceOf(Company)

    expect(company.getId()).toBe(validCompanyProps.id.getValue())
    expect(company.getName()).toBe(validCompanyProps.name)
    expect(company.getDocument()).toBe(validCompanyProps.document.getValue())
  })
})
