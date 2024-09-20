export default {
    PORT: process.env.PORT || 5000,
    DATABASE: {
        CONNECTION_STRING: process.env.DATABASE_URL,
        PROVIDER: "postgresql"
    }
}