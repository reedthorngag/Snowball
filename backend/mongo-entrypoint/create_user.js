
const DB_ADMIN_USER = "admin";
const DB_ADMIN_PASSWORD = "Q#o%aA%D(3D$Ip$8";

const DB_USER = "Snowball";
const DB_PASSWORD = "6ZVMyfG^BB>\fAZV";

let db = connect("mongodb://${DB_ADMIN_USER}:${DB_ADMIN_PASSWORD}@127.0.0.1/admin");

console.log("HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");

db = db.getSiblingDB('snowball');

db.createUser(
    {
        user: DB_USER,
        pwd: DB_PASSWORD,
        roles: [ {role: "readWrite", db: "snowball" } ]
    }
)