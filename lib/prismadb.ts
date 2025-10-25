//import { PrismaClient } from "@prisma/client";
const { PrismaClient } = require("../node_modules/@prisma/xxx-client");

const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV == "production") global.prismadb = client;

export default client;
