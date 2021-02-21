import * as superstruct from 'superstruct';

import { PackageDefinitionNpm } from '../../models/npm/PackageDefinitionNpm';

class PackageDefinitionNpmTypeGuard {
  public is(value: unknown): value is PackageDefinitionNpm {
    const schema: superstruct.Describe<PackageDefinitionNpm> = superstruct.type(
      {
        name: superstruct.string(),
        version: superstruct.string(),
      },
    );

    return superstruct.is(value, schema);
  }
}

export const packageDefinitionNpmTypeGuard: PackageDefinitionNpmTypeGuard = new PackageDefinitionNpmTypeGuard();
