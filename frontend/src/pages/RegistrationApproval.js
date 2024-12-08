import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../components/ui/use-toast';
import { Toast } from '../components/ui/toast';
import { useTheme } from "../components/theme-provider"; 

function RegistrationApproval() {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const { theme } = useTheme(); 
  const {toast, showToast} = useToast(); 


  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const fetchPendingRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/pending-registrations');
      setPendingRegistrations(response.data);
    } catch (error) {
      console.error('Error fetching pending registrations:', error);
    }
  };

  const handleApproval = async (userId, approved) => {
    try {
      await axios.post(`http://localhost:5000/api/admin/approve-registration/${userId}`, { approved });
      fetchPendingRegistrations();
      if(approved){
        showToast({
        title: "User Approved"
        });
      }
      else{
        showToast({
          title: "User Rejected",
          variant: "destructive"
        });
      }
    } 
    catch (error) {
      console.error('Error approving/rejecting registration:', error);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${theme === 'dark' ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-800'} shadow-md rounded-lg`}>
      <h1 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Registration Approval</h1>
      <ul className="space-y-4">
        {pendingRegistrations.map(user => (
          <li key={user._id} className={`flex justify-between items-center p-4 border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'} rounded-lg shadow-sm`}>
            <div>
              <p className="text-lg font-semibold">{user.username}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <button 
                onClick={() => handleApproval(user._id, true)} 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 mr-2"
              >
                Approve
              </button>
              <button 
                onClick={() => handleApproval(user._id, false)} 
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Toast toast={toast} />
    </div>
  );
}

export default RegistrationApproval;