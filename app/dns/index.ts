import { DNSHeader } from './header';
import { DNSQuestion } from './question';

export const DNS = {
  generateResponse,
};

function generateResponse() {
  const question = DNSQuestion.encode();
  const header = DNSHeader.encode({ qdcount: 1 });

  return Buffer.concat([header, question]);
}
