export const DNS = {
  generateResponse,
};

function generateResponse() {
  const headers = writeHeaders();
  const question = writeQuestion();

  return Buffer.concat([headers, question]);
}

function writeHeaders() {
  const buffer = Buffer.alloc(12);

  // Packet Identifier (ID)
  buffer.writeUInt16BE(1234, 0);

  // Query/Response Indicator (QR)
  const id = 1; // 1 bit

  // Operation Code (OPCODE)
  const opcode = 0; // 4 bits

  // Authoritative Answer (AA)
  const aa = 0; // 1 bit

  // Truncation (TC)
  const tc = 0; // 1 bit

  // Recursion Desired (RD)
  const rd = 0; // 1 bit

  // Combine all sections into a single byte
  const combinedSection1 =
    (id << 7) | // Shift 1st section to the most significant bit
    (opcode << 3) | // Shift 2nd section to the 4 bits after the 1st section
    (aa << 2) | // Shift 3rd section to the next bit
    (tc << 1) | // Shift 4th section to the next bit
    rd; // Place 5th section in the least significant bit

  buffer[2] = combinedSection1;

  // Recursion Available (RA)
  const ra = 0; // 1 bit

  // Reserved (Z)
  const z = 0; // 3 bits

  // Response Code (RCODE)
  const rcode = 0; // 4 bits

  const combinedSection2 = (ra << 7) | (z << 2) | rcode;

  buffer[3] = combinedSection2;

  // Question Count (QDCOUNT)
  buffer.writeUint16BE(1, 4);

  // Answer Record Count (ANCOUNT)
  buffer.writeUint16BE(0, 6);

  // Authority Record Count (NSCOUNT)
  buffer.writeUint16BE(0, 8);

  // Additional Record Count (ARCOUNT)
  buffer.writeUint16BE(0, 10);

  return buffer;
}

function writeQuestion() {
  const typeAndClass = Buffer.alloc(4);
  typeAndClass.writeInt16BE(1);
  typeAndClass.writeInt16BE(1, 2);

  const tld = 'io';
  const domain = 'codecrafters';

  const name = Buffer.from(
    `${String.fromCharCode(domain.length)}${domain}${String.fromCharCode(tld.length)}${tld}\0`,
    'binary',
  );

  return Buffer.concat([name, typeAndClass]);
}
