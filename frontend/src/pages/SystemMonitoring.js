import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../components/theme-provider";


function SystemMonitoring() {
  const [logs, setLogs] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const { theme } = useTheme(); // To check if useTheme is properly hooked into next-themes

  useEffect(() => {
    fetchLogs();
    fetchUserActivity();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/logs');
      setLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const fetchUserActivity = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/user-activity');
      setUserActivity(response.data);
    } catch (error) {
      console.error('Error fetching user activity:', error);
    }
  };

  return (
    <div>
      <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>
          System Monitoring
      </h1> 
      <div className="mb-6">
        <h2 className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
          Application Logs
        </h2>
        <ul className={`border rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} shadow-md`}>
          {logs.map((log, index) => (
            <li key={index} className={`p-4 border-b last:border-b-0 hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} transition-colors duration-200`}>
              {log.message} - <span className="text-gray-400">{new Date(log.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
          User Activity
        </h2>
        <ul className={`border rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} shadow-md`}>
          {userActivity.map((activity, index) => (
            <li key={index} className={`p-4 border-b last:border-b-0 hover:${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} transition-colors duration-200`}>
              {activity.username} - {activity.action} - <span className="text-gray-400">{new Date(activity.timestamp).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SystemMonitoring;

