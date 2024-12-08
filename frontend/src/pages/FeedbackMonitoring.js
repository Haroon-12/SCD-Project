import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from "../components/theme-provider"; 

function FeedbackMonitoring() {
  const [feedback, setFeedback] = useState([]);
  const { theme } = useTheme(); // To get the current theme

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/feedback');
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>
        Feedback Monitoring
      </h1>
      <ul className={`space-y-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} p-4 rounded-lg shadow-md`}>
        {feedback.map(item => (
          <li key={item._id} className={`p-4 border rounded-lg ${theme === "dark" ? "bg-gray-700" : "bg-white"} shadow`}>
            <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>Username: {item.user ? item.user.username : 'Anonymous'}</p> {/* Access username */}
            <p className={`flex items-center`}>
              <span className={`mr-2`}>Rating:</span>
              <span className="flex">{renderStars(item.rating)}</span>
            </p>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>Comment: {item.comment}</p>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>Date: {new Date(item.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackMonitoring;