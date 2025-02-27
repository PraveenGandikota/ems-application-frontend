import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [admin, setAdmin] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const result = await axios.get("http://localhost:5000/auth/profile");
        if (result.data.Status) {
          setAdmin(result.data.Result[0]); 
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
    updateGreeting(); 
  }, []);

  // Function to determine greeting based on time
  const updateGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 16) {
      setGreeting("Good Noon");
    } else if (currentHour >= 16 && currentHour < 20) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  };

  return (
    <div className='raju_ss'>
      {admin ? (
        <h2>
          {greeting}  Admin, {admin.username} !!
        </h2>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;