export const DNSHeader = {
  encode,
};

export type DNSHeaderInput = {
  z: number;
  id: number;
  aa: number;
  tc: number;
  rd: number;
  ra: number;
  qr: number;
  rcode: number;
  opcode: number;
  qdcount: number;
  ancount: number;
  nscount: number;
  arcount: number;
};

const defaultDNSHeaderInput: DNSHeaderInput = {
  z: 0,
  aa: 0,
  tc: 0,
  rd: 0,
  ra: 0,
  qr: 1,
  id: 1234,
  rcode: 0,
  opcode: 0,
  qdcount: 0,
  ancount: 0,
  nscount: 0,
  arcount: 0,
};

function encode(input?: Partial<DNSHeaderInput>): Buffer {
  const buffer = Buffer.alloc(12);

  const { z, qr, aa, tc, id, rd, ra, rcode, opcode, qdcount, ancount, nscount, arcount } = input
    ? {
        ...defaultDNSHeaderInput,
        ...input,
      }
    : defaultDNSHeaderInput;

  const firstCombinedByte =
    (qr << 7) | // Shift 1st section to the most significant bit
    (opcode << 3) | // Shift 2nd section to the 4 bits after the 1st section
    (aa << 2) | // Shift 3rd section to the next bit
    (tc << 1) | // Shift 4th section to the next bit
    rd; // Place 5th section in the least significant bit

  const secondCombinedByte = (ra << 7) | (z << 2) | rcode;

  buffer.writeUint16BE(id, 0);
  buffer[2] = firstCombinedByte;
  buffer[3] = secondCombinedByte;

  // Question Count (QDCOUNT)
  buffer.writeUint16BE(qdcount, 4);

  // Answer Record Count (ANCOUNT)
  buffer.writeUint16BE(ancount, 6);

  // Authority Record Count (NSCOUNT)
  buffer.writeUint16BE(nscount, 8);

  // Additional Record Count (ARCOUNT)
  buffer.writeUint16BE(arcount, 10);

  return buffer;
}
