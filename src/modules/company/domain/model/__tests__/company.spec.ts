import { InvalidCompanyParamException } from '../../exception/invalid-company-param.exception'
import { Company, CompanyProps } from '../company'

const validCompanyProps: CompanyProps = {
  id: '04fd8bf8-c9bc-47af-9d4c-60acb76fb91d',
  name: 'Contoso',
  document: '32182885000183',
}

describe('Company Model', () => {
  it('should throw an InvalidCompanyParamException if name is empty', () => {
    expect(() => Company.create({ ...validCompanyProps, name: '' })).toThrow(
      InvalidCompanyParamException,
    )
  })

  it('should throw an InvalidCompanyParamException if name is undefined', () => {
    const invalidProps: Partial<CompanyProps> = {
      ...validCompanyProps,
      name: undefined,
    }

    expect(() => Company.create(invalidProps as CompanyProps)).toThrow(
      InvalidCompanyParamException,
    )
  })

  it('should throw an InvalidCompanyParamException if name is null', () => {
    const invalidProps: Partial<CompanyProps> = {
      ...validCompanyProps,
      name: null as unknown as string,
    }

    expect(() => Company.create(invalidProps as CompanyProps)).toThrow(
      InvalidCompanyParamException,
    )
  })
})
