import { DNSHeader } from './dns/header';
import { DNSQuestion } from './dns/question';

export const DNS = {
  generateResponse,
};

function generateResponse() {
  const question = DNSQuestion.encode();
  const headers = DNSHeader.encode({ qdcount: 1 });

  return Buffer.concat([headers, question]);
}
