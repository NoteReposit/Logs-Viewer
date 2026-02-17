// {
//   "_id": {
//     "$oid": "6971a729c5d5e37e272f331d"
//   },
//   "labnumber": [
//     "L1850280",
//     "L1067293",
//     "L1540105",
//     "L1182715"
//   ],
//   "timestamp": {
//     "$date": "2024-02-22T13:47:42.000Z"
//   },
//   "request": {
//     "method": "GET",
//     "endpoint": "/api/get-transaction"
//   },
//   "response": {
//     "statusCode": "404",
//     "message": "Transaction not found",
//     "timeMs": 151
//   },
//   "action": "getTransaction",
//   "userId": {
//     "$oid": "6971178f323017deaeaaee8d"
//   }
// }

import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    labnumber: [
        {
            type: String,
            required: true
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now
    },
    request: {
        method: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        }
    },
    response: {
        statusCode: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        timeMs: {
            type: Number,
            required: true
        }
    },
    action: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

const Log = mongoose.model("log", logSchema);

export default Log;