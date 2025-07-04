export abstract class BaseModel<ID> {
  private readonly id: ID
  private readonly createdAt: Date
  private updatedAt: Date
  private deletedAt?: Date | null

  protected constructor(id: ID, createdAt: Date, updatedAt: Date, deletedAt: Date | null) {
    const now = new Date()
    this.id = id
    this.createdAt = createdAt ?? now
    this.updatedAt = updatedAt ?? now
    this.deletedAt = deletedAt ?? null
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
