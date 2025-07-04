import { InvalidCostCenterParamException } from '../../exceptions'
import { CostCenterProps } from '../../types'
import { ID } from '../../value-objects'
import { CostCenter } from '../cost-center'

const validCostCenterProps: CostCenterProps = {
  id: ID.create(),
  name: 'Financial',
}

describe('Cost Center', () => {
  describe('Params validations', () => {
    it('should throw an InvalidCostCenterParamException if name is empty', () => {
      expect(() => CostCenter.create({ ...validCostCenterProps, name: '' })).toThrow(
        InvalidCostCenterParamException,
      )
    })
  })
})
