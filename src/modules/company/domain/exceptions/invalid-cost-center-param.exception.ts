import { DomainException } from '@/common/exception/domain.exception'

export class InvalidCostCenterParamException extends DomainException {
  constructor(param: string) {
    super(`Parâmetro do Centro de Custo inválido ou não informado: ${param}`, 422, {
      param,
    })
  }
}
