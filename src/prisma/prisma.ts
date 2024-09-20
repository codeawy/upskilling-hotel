import { PrismaClient } from "@prisma/client";
import CONFIG from "../config/app.config";

const prisma = new PrismaClient({
    datasources: {
        db: {
            // This will override the connection string in the Prisma schema file
            url: CONFIG.DATABASE.CONNECTION_STRING
        }
    }
});

export default prisma;