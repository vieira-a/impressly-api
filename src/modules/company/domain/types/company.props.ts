import { CNPJ, ID } from '../value-objects'

export type CompanyProps = {
  id: ID
  name: string
  document: CNPJ
}
