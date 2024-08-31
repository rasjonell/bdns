import { DNSAnswer } from './answer';
import { DNSHeader } from './header';
import { DNSQuestion } from './question';

export const DNS = {
  generateResponse,
};

function generateResponse(data: Buffer) {
  // Hardcoding some values for this stage
  const parsedHeaders = DNSHeader.parse(data);
  const rHeader = DNSHeader.encode({
    ...parsedHeaders,
    qr: 1,
    aa: 0,
    z: 0,
    tc: 0,
    ra: 0,
    rcode: parsedHeaders.opcode === 0 ? 0 : 4,
  });

  const parsedQuestion = DNSQuestion.parse(data);
  const rQuestion = DNSQuestion.encode(parsedQuestion);

  const rAnswer = DNSAnswer.encode(rQuestion);

  return Buffer.concat([rHeader, rQuestion, rAnswer]);
}
