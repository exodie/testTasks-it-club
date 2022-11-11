import bcrypt from 'bcryptjs';

export default class EncodeServer {
    public async encode(data: string): Promise<string> {
        const hash = (await bcrypt.hash(data, 10)).toString();

        return hash;
    }

    public async decode(hash: string, data: string): Promise<boolean> {
        const decode = bcrypt.compare(hash, data);

        return decode;
    }
}