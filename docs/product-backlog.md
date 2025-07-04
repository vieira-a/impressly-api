# Sistema de Gestão de Impressões Corporativas

## Épico 1: Gestão da Estrutura Organizacional (Company)

### User Story 1.1 — Cadastro de Empresas e Unidades

- **Como** administrador
- **Quero** cadastrar empresas (tenants) e suas unidades (filiais/centros de custo)
- **Para** que a estrutura da holding seja refletida no sistema e permita segmentação dos recursos

#### Tasks:

- [ ] Criar entidades Company e Unit com relacionamentos e tenantId
- [ ] Implementar repositórios e serviços para CRUD completo
- [ ] Criar APIs REST para gerenciamento de empresas e unidades
- [ ] Garantir validação de unicidade e integridade referencial
- [ ] Testes unitários e integração

### User Story 1.2 — Cadastro de Departamentos

- **Como** administrador
- **Quero** cadastrar departamentos vinculados às unidades
- **Para** que impressoras e usuários sejam corretamente associados aos setores

#### Tasks:

- [ ] Criar entidade Department relacionada à Unit
- [ ] Implementar CRUD via serviços e APIs REST
- [ ] Validação de unicidade por unidade
- [ ] Testes automatizados

## Épico 2: Gestão de Impressoras e Coleta de Dados (Print Management + SNMP Integration)

### User Story 2.1 — Cadastro e Gerenciamento de Impressoras

- **Como** operador ou administrador
- **Quero** cadastrar impressoras, associando IP, modelo, unidade e departamento
- **Para** que as impressoras possam ser monitoradas e usadas no sistema

#### Tasks:

- [ ] Criar entidade Printer vinculada a Department
- [ ] Criar APIs para criação, edição, listagem e remoção de impressoras
- [ ] Validação de IP e unicidade dentro do departamento
- [ ] Testes unitários

### User Story 2.2 — Registro Manual de Contadores

- **Como** operador
- **Quero** registrar manualmente contadores de impressões (P&B, coloridas, total)
- **Para** que o sistema possa ser atualizado caso a coleta automática falhe

#### Tasks:

- [ ] Criar entidade PrintRecord associada a Printer
- [ ] Serviço para inserção manual via API REST
- [ ] Validação para evitar registros retroativos inválidos
- [ ] Testes unitários

### User Story 2.3 — Coleta Automática de Dados via SNMP

- **Como** sistema
- **Quero** coletar periodicamente dados de impressoras via SNMP utilizando agendamento
- **Para** que a base de dados esteja sempre atualizada automaticamente

#### Tasks:

- [ ] Implementar integração SNMP (SnmpTarget, OidMap)
- [ ] Agendamento e execução via BullMQ (com Redis)
- [ ] Processamento dos dados coletados e registro em PrintRecord
- [ ] Testes de integração

## Épico 3: Autenticação e Autorização (Identity)

### User Story 3.1 — Gerenciamento de Usuários e Perfis

- **Como** administrador
- **Quero** criar usuários com roles (admin, gestor, operador) e associá-los a empresas, unidades e departamentos
- **Para** que o acesso seja controlado conforme responsabilidades

#### Tasks:

- [ ] Criar entidades User, Role, Permission
- [ ] Implementar cadastro e edição de usuários com hash de senha (bcrypt)
- [ ] APIs para gerenciamento de usuários e roles
- [ ] Testes unitários

### User Story 3.2 — Login com JWT e Controle de Acesso

- **Como** usuário
- **Quero** autenticar usando JWT e refresh token
- **Para** que tenha acesso seguro ao sistema conforme meu perfil

#### Tasks:

- [ ] Implementar estratégia JWT com refresh token
- [ ] Criar Guards e Decorators para RBAC
- [ ] Testes de autorização

## Épico 4: Relatórios e Métricas (Analytics & Reports)

### User Story 4.1 — Visualização de Volume e Custos

- **Como** gestor
- **Quero** visualizar dashboards com dados de volume de impressão e custo por empresa, unidade e departamento
- **Para** que eu possa controlar os gastos

#### Tasks:

- [ ] Criar endpoints que agreguem dados com filtros contextuais
- [ ] Implementar cálculos de custo com base no volume
- [ ] Desenvolver dashboards e gráficos no frontend
- [ ] Testes end-to-end

### User Story 4.2 — Histórico e Tendências

- **Como** gestor
- **Quero** consultar históricos e tendências de uso
- **Para** poder planejar melhor os recursos e orçamentos

#### Tasks:

- [ ] Consultas temporais e agregações históricas
- [ ] Gráficos de tendência
- [ ] Testes de usabilidade e performance

## Épico 5: Sistema de Notificações (Notification System) — Futuro

### User Story 5.1 — Configuração e Envio de Alertas

- **Como** operador ou gestor
- **Quero** configurar alertas para impressoras (ex: toner baixo, offline) e receber notificações via e-mail ou WhatsApp
- **Para** poder agir rapidamente em problemas

#### Tasks:

- [ ] Criar regras de alerta (AlertRule)
- [ ] Integração com canais (NotificationChannel) como Twilio
- [ ] Logs de notificações (NotificationLog)
- [ ] Testes funcionais
