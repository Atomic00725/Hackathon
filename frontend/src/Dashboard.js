// export default function Dashboard() {
//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1>Welcome to the Dashboard</h1>
//       <p>You successfully logged in!</p>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      navigate("/"); // if not logged in
      return;
    }

    fetch(`http://localhost:5000/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
          navigate("/");
        } else {
          setProfile(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
  };

  if (loading) return <div style={styles.loading}>Loading profile...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>👋 Welcome, {profile.fullname}</h1>
      <p style={styles.subtext}>📧 {profile.email}</p>
      <button onClick={handleLogout} style={styles.logout}>Logout</button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f0ff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Montserrat', sans-serif",
    padding: "2rem",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#3b2f63",
  },
  subtext: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#666",
  },
  logout: {
    background: "#534f91",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
  },
  loading: {
    fontFamily: "'Montserrat', sans-serif",
    padding: "2rem",
    fontSize: "1.2rem",
    textAlign: "center"
  }
};
