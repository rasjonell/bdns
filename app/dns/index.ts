import { DNSAnswer } from './answer';
import { DNSHeader } from './header';
import { DNSQuestion } from './question';

export const DNS = {
  generateResponse,
};

function generateResponse(data: Buffer) {
  const parsedHeaders = DNSHeader.parse(data);

  const rQuestion = DNSQuestion.encode();
  const rAnswer = DNSAnswer.encode(rQuestion);

  // Hardcoding some values for this stage
  const rHeader = DNSHeader.encode({
    ...parsedHeaders,
    qr: 1,
    aa: 0,
    z: 0,
    tc: 0,
    ra: 0,
    rcode: parsedHeaders.opcode === 0 ? 0 : 4,
  });

  return Buffer.concat([rHeader, rQuestion, rAnswer]);
}
