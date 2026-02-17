import mongoose from "mongoose";


// {
//   "_id": {
//     "$oid": "6971178f323017deaeaaee83"
//   },
//   "username": "alice",
//   "password": "$2b$09$DaCa6AHh/xM.dVSmFY8KWumzktRT.vpOtl4dis3YUrf9nQDgtrr/G",
//   "code": "001",
//   "prefix": "Ms.",
//   "firstname": "ALICE",
//   "lastname": "JOHNSON",
//   "level": "admin",
//   "isActive": true,
//   "isDel": false
// }

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isDel: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model("user", userSchema);

export default User;