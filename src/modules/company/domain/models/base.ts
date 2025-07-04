export abstract class BaseModel<ID> {
  protected readonly id: ID
  protected readonly createdAt: Date
  protected updatedAt: Date
  protected deletedAt?: Date | null

  protected constructor(id: ID) {
    const now = new Date()
    this.id = id
    this.createdAt = now
    this.updatedAt = now
    this.deletedAt = null
  }

  getId(): ID {
    return this.id
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getUpdatedAt(): Date {
    return this.updatedAt
  }

  getDeletedAt(): Date | null | undefined {
    return this.deletedAt
  }
}
