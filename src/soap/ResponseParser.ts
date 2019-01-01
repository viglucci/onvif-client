
import { parseString } from 'xml2js';

export default abstract class ResponseParser {

  private static tagPrefixRegex: RegExp = /(?!xmlns)^.*:/;

  private static nameSpaceRegex: RegExp = /xmlns(.*?)=(".*?")/g;

  private static numberRegex: RegExp = /^-?([1-9]\d*|0)(\.\d*)?$/;

  private static dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(.\d+)?Z$/;

  private static parserOptions: Object = {
    tagNameProcessors: [
      ResponseParser.transformTagName
    ]
  }

  public static async parse(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
      parseString(
        ResponseParser.stripNamespace(xml),
        ResponseParser.parserOptions,
        (err, result) => {
          if (err) {
            return reject(err);
          }
          if (!result || !result.envelope || !result.envelope.body) {
            return reject(new Error(`Invalid ONVIF SOAP response. \n ${xml}`));
          }
          const payload = ResponseParser.reduceBody(result['envelope'].body);
          return resolve(payload);
        }
      );
    });
  }

  private static reduceBody(subject: any): any {
    if (Array.isArray(subject)) {
      if (subject.length > 1) {
        return subject.map(ResponseParser.reduceBody);
      } else {
        subject = subject[0];
      }
    }
    if (typeof subject === 'object') {
      const obj = {};
      Object.keys(subject).forEach(function(key) {
        obj[key] = ResponseParser.reduceBody(subject[key]);
      });
      return obj;
    } else {
      if (subject === 'true') {
        return true;
      }
      if (subject === 'false') {
        return false;
      }
      if (ResponseParser.numberRegex.test(subject)) {
        return parseFloat(subject);
      }
      if (ResponseParser.dateRegex.test(subject)) {
        return new Date(subject);
      }
      return subject;
    }
  }

  private static stripNamespace(xml: string): string {
    return xml.replace(ResponseParser.nameSpaceRegex, '');
  }

  private static transformTagName(tagName: string) {
    tagName = tagName.replace(ResponseParser.tagPrefixRegex, '');
    var secondLetter = tagName.charAt(1);
    if (secondLetter && secondLetter.toUpperCase() !== secondLetter) {
      return tagName.charAt(0).toLowerCase() + tagName.slice(1);
    } else {
      return tagName;
    }
  }
}
