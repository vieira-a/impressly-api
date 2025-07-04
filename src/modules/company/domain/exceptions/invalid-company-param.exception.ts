import { DomainException } from '@/common/exception/domain.exception'

export class InvalidCompanyParamException extends DomainException {
  constructor(param: string) {
    super(`Parâmetro da Empresa inválido ou não informado: ${param}`, 422, {
      param,
    })
  }
}
