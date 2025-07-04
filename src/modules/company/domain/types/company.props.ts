import { CNPJ } from '../value-objects/cnpj'
import { ID } from '../value-objects/id'

export type CompanyProps = {
  id: ID
  name: string
  document: CNPJ
}
