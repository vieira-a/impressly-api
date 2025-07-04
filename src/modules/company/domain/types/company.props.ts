import { CNPJ } from '../models/value-objects/cnpj'
import { ID } from '../models/value-objects/id'

export type CompanyProps = {
  id: ID
  name: string
  document: CNPJ
}
