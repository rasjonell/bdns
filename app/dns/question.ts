import { numberToHexString } from '../utils/converters';

export const DNSQuestion = {
  parse,
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

function parse(buffer: Buffer): DNSQuestionInput {
  const typeAndClassBuffer = buffer.subarray(-4);
  const type = typeAndClassBuffer.readUInt16BE(0);
  const questionClass = typeAndClassBuffer.readUInt16BE(2);

  const encodedNameBuffer = buffer.subarray(12, -4);

  let name = '';
  let offset = 0;

  while (offset < encodedNameBuffer.length) {
    const length = encodedNameBuffer[offset];
    if (length === 0) break; // Null byte indicates the end of the name
    const part = encodedNameBuffer.subarray(offset + 1, offset + 1 + length).toString('binary');
    name += part + '.';
    offset += 1 + length;
  }

  // Remove the trailing dot from the name
  name = name.slice(0, -1);

  return { type, name, questionClass };
}
