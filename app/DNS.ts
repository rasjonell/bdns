export const DNS = {
  generateResponse,
};

function generateResponse() {
  const buffer = Buffer.alloc(12);

  writeHeaders(buffer);

  return buffer;
}

function writeHeaders(buffer: Buffer) {
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
  buffer.writeUint16BE(0, 4);

  // Answer Record Count (ANCOUNT)
  buffer.writeUint16BE(0, 6);

  // Authority Record Count (NSCOUNT)
  buffer.writeUint16BE(0, 8);

  // Additional Record Count (ARCOUNT)
  buffer.writeUint16BE(0, 10);
}
