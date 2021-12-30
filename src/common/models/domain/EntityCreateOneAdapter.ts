import { Entity } from './Entity';

export interface EntityCreateOneAdapter<
  TEntityCreationQuery,
  TEntity extends Entity
> {
  createOne(entityCreationQuery: TEntityCreationQuery): Promise<TEntity>;
}
