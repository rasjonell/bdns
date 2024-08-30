import { numberToHexString } from '../utils/converters';

export const DNSQuestion = {
  encode,
};

export type DNSQuestionInput = {
  type: number;
  name: string;
  questionClass: number;
};

export const defaultDNSQuestionInput = {
  type: 1,
  questionClass: 1,
  name: 'codecrafters.io',
};

function encode(input?: Partial<DNSQuestionInput>) {
  const { type, questionClass, name } = input
    ? { ...defaultDNSQuestionInput, ...input }
    : defaultDNSQuestionInput;

  const typeAndClassBuffer = Buffer.alloc(4);
  typeAndClassBuffer.writeUInt16BE(type);
  typeAndClassBuffer.writeUInt16BE(questionClass, 2);

  const encodedName =
    name
      .split('.')
      .map((part) => `${numberToHexString(part.length)}${part}`)
      .join('') + '\0';

  return Buffer.concat([Buffer.from(encodedName, 'binary'), typeAndClassBuffer]);
}
