import { DomainException } from '@/common/exception/domain.exception'

export class DuplicatedResourceException extends DomainException {
  constructor(param: string) {
    super(`Este registro já existe: ${param}`, 409, {
      param,
    })
  }
}
