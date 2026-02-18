import { useState, useEffect } from "react"

import axios from "axios"
import { ChevronLeft, ChevronRight } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const ACTION_OPTIONS = [
  "แสดงทั้งหมด",
  "labOrder",
  "labResult",
  "receive",
  "accept",
  "approve",
  "reapprove",
  "unapprove",
  "unreceive",
  "rerun",
  "save",
  "listTransactions",
  "getTransaction",
  "analyzerResult",
  "analyzerRequest"
];

const getDefaultStart = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString().slice(0, 16);
};

const getDefaultEnd = () => {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  return now.toISOString().slice(0, 16);
};

function LogPage() {
  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  // filters state
  const [logs, setLogs] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAction, setSelectedAction] = useState("แสดงทั้งหมด");

  const [startDate, setStartDate] = useState(getDefaultStart());
  const [endDate, setEndDate] = useState(getDefaultEnd());

  const [users, setUsers] = useState([]);

  const [statusCode, setStatusCode] = useState("");

  const [labNumber, setLabNumber] = useState("");

  const [minTime, setMinTime] = useState(0);
  const [maxTime, setMaxTime] = useState(999999);

  // param
  const actionParam = selectedAction === "แสดงทั้งหมด" ? "" : selectedAction;

  // User fetching
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/users/`);
      console.log("Fetched users:", res.data);

      const activeUsers = res.data.filter(user => !user.isDel);
      setUsers(activeUsers);
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  };

  // Logs fetching
  const fetchLogs = async (pageNumber = 1) => {
    try {
      // console.log(`Fetching: Action=${actionParam}, Start=${startDate}, End=${endDate} User=${userParam} Status=${statusParam} Lab=${labParam}`);

      const res = await axios.get(`${API_URL}/api/logs`, {
        params: {
          page: pageNumber,
          limit: 50,
          action: actionParam,
          startDate,
          endDate,
          userId: selectedUser,
          statusCode,
          labNumber,
          minTime,
          maxTime
        }
      });

      setLogs(res.data.logs);
      setTotalPages(res.data.totalPages);
      setTotalLogs(res.data.totalLogs);
      setPage(pageNumber);
    } catch (error) {
      console.error("Error fetching logs:", error)
    }
  }

  // button
  const handleApplyFilter = () => {
    setPage(1);
    fetchLogs(1);
  };

  const handleReset = () => {
    setPage(1);
    fetchLogs(1);

    setSelectedAction("แสดงทั้งหมด");
    setStartDate(getDefaultStart());
    setEndDate(getDefaultEnd());
    setSelectedUser("");
    setStatusCode("");
    setLabNumber("");
    setMinTime(0);
    setMaxTime(999999);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchLogs(newPage);
    }
  };

  useEffect(() => {
    fetchLogs();
    fetchUser();
  }, []);

  // decoration
  const getMethodBadge = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-black border-l-4 border-blue-500 pl-4">
            System Access Logs
          </h2>
          <p className="text-black mt-1 pl-4 text-sm">
            รายการบันทึกการใช้งานระบบทั้งหมด
          </p>
        </div>

        {/* filter */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-stone-700 text-xl font-bold">Apply filters</h2>
          <p className="mt-1 text-sm">Use filters to further refine search</p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* User */}
            <div className="flex flex-col">
              <label className="text-stone-600 text-sm font-medium">User</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">แสดงทั้งหมด</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.prefix} {user.firstname} {user.lastname}
                  </option>
                ))}
              </select>
            </div>

            {/* Timestamp */}
            <div className="flex flex-col">
              <label htmlFor="startDate" className="text-stone-600 text-sm font-medium">From Date</label>
              <input
                type="datetime-local"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="endDate" className="text-stone-600 text-sm font-medium">To Date</label>
              <input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
              />
            </div>

            {/* Action */}
            <div className="flex flex-col">
              <label className="text-stone-600 text-sm font-medium">Action</label>

              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 
                      shadow-sm outline-none focus:border-blue-500 focus:ring 
                      focus:ring-blue-200 focus:ring-opacity-50"
              >
                {ACTION_OPTIONS.map((action, index) => (
                  <option key={index} value={action}>
                    {action}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Code */}
            <div className="flex flex-col">
              <label className="text-stone-600 text-sm font-medium">Status Code</label>
              <input
                type="text"
                value={statusCode}
                onChange={(e) => setStatusCode(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm"
              />
            </div>

            {/* Lab Number */}
            <div className="flex flex-col">
              <label className="text-stone-600 text-sm font-medium">Lab Number</label>
              <input
                type="text"
                value={labNumber}
                onChange={(e) => setLabNumber(e.target.value)}
                className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 text-sm shadow-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Time (Min - Max) --- */}
            <div className="flex flex-col md:col-span-2">
              <label className="text-stone-600 text-sm font-medium">Response Time (ms)</label>
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="number"
                  value={minTime}
                  onChange={(e) => setMinTime(e.target.value)}
                  placeholder="Min"
                  className="block w-full rounded-md border border-gray-200 px-2 py-2 text-sm shadow-sm outline-none focus:border-blue-500"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  value={maxTime}
                  onChange={(e) => setMaxTime(e.target.value)}
                  placeholder="Max"
                  className="block w-full rounded-md border border-gray-200 px-2 py-2 text-sm shadow-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

          </div>

          {/* botton */}
          <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
            <button
              onClick={handleReset}
              className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
            >
              Reset
            </button>
            <button
              onClick={handleApplyFilter}
              className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm bg-white mt-6">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              ไม่พบข้อมูล Log ที่ค้นหา
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Method</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Endpoint</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Time (ms)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lab No.</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {logs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50 transition-colors">

                      {/* User */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {log.userId
                          ? `${log.userId.prefix} ${log.userId.firstname} ${log.userId.lastname}`
                          : <span className="text-gray-400 italic">Unknown</span>}
                      </td>

                      {/* Method */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getMethodBadge(log.request?.method)}`}>
                          {log.request?.method}
                        </span>
                      </td>

                      {/* Endpoint */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono truncate" title={log.request?.endpoint}>
                        {log.request?.endpoint}
                      </td>

                      {/* Status Code */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-bold ${log.response?.statusCode >= 400 ? 'text-red-600' : 'text-green-600'}`}>
                          {log.response?.statusCode}
                        </span>
                      </td>

                      {/* TimeMs */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                        {log.response?.timeMs} ms
                      </td>

                      {/* Timestamp */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(log.timestamp).toLocaleString('th-TH', {
                          day: '2-digit', month: '2-digit', year: '2-digit',
                          hour: '2-digit', minute: '2-digit', second: '2-digit'
                        })}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.action}
                      </td>

                      {/* Lab Number */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.labnumber && log.labnumber.length > 0 ? (
                          <div className="flex gap-1">
                            {log.labnumber.map((num, i) => (
                              <span key={i} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs border border-gray-200">
                                {num}
                              </span>
                            ))}
                          </div>
                        ) : '-'}
                      </td>

                      {/* Message */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate" title={log.response?.message}>
                        {log.response?.message || '-'}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {logs.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4 rounded-lg shadow-sm">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                  {' '}(Total <span className="font-medium">{totalLogs}</span> results)
                </p>
              </div>

              {/* Previous / Next */}
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                    {page}
                  </span>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LogPage
