import Log from "../models/Log.js";

export async function getLogAll(req, res) {
    try {
        // pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        // filters query
        const { action } = req.query;
        let query = {};

        if (action && action !== "แสดงทั้งหมด") {
            query.action = action;
        }

        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (req.query.userId) {
            query.userId = req.query.userId;
        }

        const { statusCode } = req.query;
        if (statusCode && statusCode.trim() !== "") {
            query['response.statusCode'] = Number(statusCode);
        }

        const { labNumber } = req.query;
        if (labNumber && labNumber.trim() !== "") {
            const labList = labNumber.split(',').map(item => item.trim());

            query.labnumber = { $in: labList };
        }

        const { minTime, maxTime } = req.query;
        if (minTime !== undefined || maxTime !== undefined) {
            query['response.timeMs'] = {
                $gte: minTime ? Number(minTime) : 0,
                $lte: maxTime ? Number(maxTime) : 999999
            };
        }

        const logs = await Log.find(query)
            .populate('userId', 'prefix firstname lastname')
            .sort({ timestamp: -1 })
            .skip(skip)
            .limit(limit);

        const totalLogs = await Log.countDocuments(query);
        const totalPages = Math.ceil(totalLogs / limit);

        res.status(200).json({
            logs,
            currentPage: page,
            totalPages,
            totalLogs
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
