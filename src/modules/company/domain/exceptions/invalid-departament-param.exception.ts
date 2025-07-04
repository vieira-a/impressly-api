import { DomainException } from '@/common/exception/domain.exception'

export class InvalidDepartamentParamException extends DomainException {
  constructor(param: string) {
    super(`Parâmetro do Departamento inválido ou não informado: ${param}`, 422, {
      param,
    })
  }
}
