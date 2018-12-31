import * as fs from 'fs';

export default abstract class XMLMockReader {
  public static readFile(path: string): string {
    return fs.readFileSync(path).toString();
  }
}
