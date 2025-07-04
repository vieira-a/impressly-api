import { InvalidCompanyParamException } from '../../exception/invalid-company-param.exception'
import { Company } from '../company'

const validCompanyProps = {
  id: '04fd8bf8-c9bc-47af-9d4c-60acb76fb91d',
  name: 'Contoso',
  document: '32182885000183',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
}

describe('Company Model', () => {
  it('should throws an InvalidCompanyrParamException if name is empty', () => {
    expect(() => Company.create({ ...validCompanyProps, name: '' })).toThrow(
      InvalidCompanyParamException,
    )
  })
})
