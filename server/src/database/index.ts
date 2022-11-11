import { PrismaClient } from '@prisma/client';
import log from '../utils/logUtils';

const prisma = new PrismaClient();

async function main() {
    log.handler('Success', 'Prisma', 'Database connection sucessfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        log.handler('Error', 'Prisma', 'Prisma error, disconnected...');
        await prisma.$disconnect();
        process.exit(1);
    });