import { readFileSync } from 'fs';

import { ServerInfo } from '../../models/domain/ServerInfo';
import { packageDefinitionNpmTypeGuard } from '../../type-guards/npm/PackageDefinitionNpmTypeGuard';

class GetServerInfoNpmAdapter {
  private readonly packageJsonFileLocation: string =
    process.cwd() + '/package.json';

  public getServerInfo(): ServerInfo {
    const packageJson: unknown = this.fetchPackageJsonFile();

    if (packageDefinitionNpmTypeGuard.is(packageJson)) {
      const serverInfo: ServerInfo = {
        name: packageJson.name,
        version: packageJson.version,
      };

      return serverInfo;
    } else {
      throw Error('Error parsing package.json');
    }
  }

  private fetchPackageJsonFile(): unknown {
    try {
      const rawPackageJson: Buffer = readFileSync(this.packageJsonFileLocation);

      const packageJson: unknown = JSON.parse(rawPackageJson.toString());

      return packageJson;
    } catch (error) {
      throw new Error('Error reading package.json file');
    }
  }
}

export const getServerInfoNpmAdapter: GetServerInfoNpmAdapter = new GetServerInfoNpmAdapter();
