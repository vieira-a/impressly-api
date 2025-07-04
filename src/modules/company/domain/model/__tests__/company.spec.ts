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
})
