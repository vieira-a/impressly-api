import { InvalidDepartamentParamException } from '../../exceptions'
import { DepartamentProps } from '../../types'
import { ID } from '../../value-objects'
import { Departament } from '../departament'

const validDepartamentProps: DepartamentProps = {
  id: ID.create(),
  name: 'Support',
}

describe('Departament Model', () => {
  describe('Params validations', () => {
    const invalidNames = [
      ['', 'empty string'],
      [undefined, 'undefined value'],
      [null, 'null value'],
      ['  ', 'blank spaces'],
    ]

    test.each(invalidNames)(
      'should throw InvalidDepartamentParamException when name is %s (%s)',
      (name: string) => {
        expect(() =>
          Departament.create({ ...validDepartamentProps, name: name as unknown as string }),
        ).toThrow(InvalidDepartamentParamException)
      },
    )
  })
})
