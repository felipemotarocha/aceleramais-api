import { S3RepositoryAbstract } from './s3.repository'

export class S3RepositoryStub implements S3RepositoryAbstract {
  async uploadImage(): Promise<string> {
    return 'valid_url'
  }
}
