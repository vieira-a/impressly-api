import { InvalidCostCenterParamException } from '../exceptions'
import { CostCenterProps } from '../types'
import { ID } from '../value-objects'
import { BaseModel } from './base'

export class CostCenter extends BaseModel<ID> {
  private readonly name: string

  private constructor(id: ID, name: string) {
    super(id)
    this.name = name
    this.validate()
  }

  public static create(props: CostCenterProps) {
    return new CostCenter(props.id, props.name)
  }

  private validate(): void {
    if (this.name === undefined || this.name === null || this.name.trim() === '') {
      throw new InvalidCostCenterParamException('Nome')
    }
  }
}
