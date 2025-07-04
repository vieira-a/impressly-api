import { InvalidCostCenterParamException } from '../../exceptions'
import { CostCenterProps } from '../../types'
import { ID } from '../../value-objects'
import { CostCenter } from '../cost-center'

const validCostCenterProps: CostCenterProps = {
  id: ID.create(),
  name: 'Financial',
}

describe('Cost Center Model', () => {
  describe('Params validations', () => {
    const invalidNames = [
      ['', 'empty string'],
      [undefined, 'undefined value'],
      [null, 'null value'],
      ['  ', 'blank spaces'],
    ]

    test.each(invalidNames)(
      'should throw InvalidCostCenterParamException when name is %s (%s)',
      (name: string) => {
        expect(() =>
          CostCenter.create({ ...validCostCenterProps, name: name as unknown as string }),
        ).toThrow(InvalidCostCenterParamException)
      },
    )
  })

  describe('Success case', () => {
    it('should create a Cost Center successfully with valid params', () => {
      const costCenter = CostCenter.create(validCostCenterProps)

      expect(costCenter).toBeInstanceOf(CostCenter)
      expect(costCenter.getId().getValue()).toBe(validCostCenterProps.id.getValue())
      expect(costCenter.getName()).toBe(validCostCenterProps.name)

      expect(costCenter.getCreatedAt()).toBeInstanceOf(Date)
      expect(costCenter.getUpdatedAt()).toBeInstanceOf(Date)
      expect(costCenter.getDeletedAt()).toBeNull()
    })
  })
})
