import { useEffect, useState } from "react";
import { getAllUsers } from "../api/adminService";
import Navbar from "../components/Navbar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={styles.loader}>
        <p style={styles.loaderText}>Syncing Database...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        {/* HEADER */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            Customer <span style={styles.subTitle}>Directory</span>
          </h1>
          <span style={styles.badge}>{users.length} USERS</span>
        </div>

        {/* TABLE */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>#</th>
                <th style={styles.th}>USER ID</th>
                <th style={styles.th}>NAME</th>
                <th style={styles.th}>EMAIL</th>
                <th style={styles.th}>PASSWORD (HASH)</th>
                <th style={styles.th}>JOINED</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} style={styles.tr}>
                  <td style={styles.tdCenter}>{index + 1}</td>

                  <td style={styles.tdMono}>
                    {user._id.slice(-8).toUpperCase()}
                  </td>

                  <td style={styles.tdBold}>
                    {user.name || "Anonymous"}
                  </td>

                  <td style={styles.td}>{user.email}</td>

                  {/* PASSWORD FIELD */}
                  <td style={styles.tdHash}>
                    {user.password || "No Password Set"}
                  </td>

                  <td style={styles.td}>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={styles.footer}>
          End of registry — Javen Co. Admin Panel
        </p>
      </div>
    </div>
  );
}

/* ================= INLINE STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
  },
  container: {
    maxWidth: "1300px", // Made slightly wider for the extra column
    margin: "120px auto 60px",
    padding: "0 20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottom: "4px solid black",
    paddingBottom: "12px",
    marginBottom: "30px",
  },
  title: {
    fontSize: "42px",
    fontWeight: "900",
    margin: 0,
  },
  subTitle: {
    color: "#999",
  },
  badge: {
    backgroundColor: "black",
    color: "white",
    padding: "6px 14px",
    fontSize: "12px",
    fontWeight: "700",
  },
  tableWrapper: {
    overflowX: "auto",
    border: "2px solid black",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "2px solid black",
    padding: "14px",
    fontSize: "12px",
    fontWeight: "900",
    backgroundColor: "black",
    color: "white",
    textAlign: "left",
  },
  tr: {
    borderBottom: "2px solid black",
  },
  td: {
    border: "2px solid black",
    padding: "14px",
    fontSize: "14px",
  },
  tdCenter: {
    border: "2px solid black",
    padding: "14px",
    textAlign: "center",
    fontWeight: "700",
  },
  tdBold: {
    border: "2px solid black",
    padding: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  tdMono: {
    border: "2px solid black",
    padding: "14px",
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#444",
  },
  tdHash: {
    border: "2px solid black",
    padding: "14px",
    fontFamily: "monospace",
    fontSize: "10px",
    color: "#d32f2f", // Reddish color to indicate sensitive data
    wordBreak: "break-all",
    maxWidth: "180px",
  },
  footer: {
    marginTop: "30px",
    textAlign: "center",
    fontSize: "11px",
    letterSpacing: "2px",
    color: "#777",
  },
  loader: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    fontSize: "12px",
    letterSpacing: "4px",
  },
};