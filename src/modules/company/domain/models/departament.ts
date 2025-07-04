import { InvalidDepartamentParamException } from '../exceptions'
import { DepartamentProps } from '../types'
import { ID } from '../value-objects'
import { BaseModel } from './base'

export class Departament extends BaseModel<ID> {
  private readonly name: string

  private constructor(id: ID, name: string) {
    super(id)
    this.name = name
    this.validate()
  }

  public static create(props: DepartamentProps): Departament {
    return new Departament(props.id, props.name)
  }

  private validate(): void {
    if (this.name === undefined || this.name === null || this.name.trim() === '') {
      throw new InvalidDepartamentParamException('Nome')
    }
  }
}
