import { CNPJ } from '../models/cnpj'
import { ID } from '../models/id'

export type CompanyProps = {
  id: ID
  name: string
  document: CNPJ
}
