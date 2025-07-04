import { DomainException } from '@/common/exception/domain-exception'

export class InvalidDocumentException extends DomainException {
  constructor(document: string) {
    super(`Documento inválido: ${document}`, 422, { document })
  }
}
