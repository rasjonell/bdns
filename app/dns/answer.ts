import { numberToHexString } from '../utils/converters';

export const DNSAnswer = {
  encode,
};

const defaultAnswer = {
  ttl: 60,
  length: 4,
  data: '8.8.8.8',
};

function encode(questionBuffer: Buffer) {
  const answerBuffer = Buffer.alloc(10);

  const { ttl, length, data } = defaultAnswer;

  answerBuffer.writeUInt32BE(ttl);
  answerBuffer.writeUInt16BE(length);

  const rdata = Number(
    data
      .split('.')
      .map((part) => numberToHexString(+part))
      .join(''),
  );
  answerBuffer.writeUInt32BE(rdata);

  return Buffer.concat([questionBuffer, answerBuffer]);
}
