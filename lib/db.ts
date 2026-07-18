
const MONGOBD_URI= process.env.MONGOBD_URI

if (!MONGOBD_URI) {
    throw new Error(
        "Please define the MONGODB_URI variable inside .env"
    );
}