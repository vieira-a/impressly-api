import { cnpj } from 'cpf-cnpj-validator'
import { DocumentValidator } from '../models/document-validator.interface'

export class CNPJValidator implements DocumentValidator {
  validate(value: string): boolean {
    return cnpj.isValid(value)
  }
}
