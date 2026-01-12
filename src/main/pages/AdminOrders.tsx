import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import API from "../api/adminAPi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get('/orders/admin/all');
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admin orders:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await API.patch(`/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  /* ================= INLINE STYLES ================= */
  const styles = {
    container: {
      background: 'radial-gradient(circle at top, #ffffff 0%, #f4f4f4 60%)',
      minHeight: '100vh',
      paddingTop: '6rem',
      paddingBottom: '5rem',
      fontFamily: '"Inter", sans-serif'
    },
    glassCard: {
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(0,0,0,0.05)',
      boxShadow: '0 40px 80px rgba(0,0,0,0.08)'
    },
    tableHeader: {
      fontSize: '10px',
      fontWeight: '900',
      textTransform: 'uppercase',
      letterSpacing: '0.25em',
      color: '#6B7280',
      padding: '1.5rem',
      borderBottom: '1px solid #E5E7EB'
    },
    statusBadge: (status) => ({
      padding: '6px 14px',
      borderRadius: '999px',
      fontSize: '9px',
      fontWeight: '900',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: '#fff',
      background:
        status === 'Delivered'
          ? 'linear-gradient(135deg,#10B981,#059669)'
          : status === 'Shipped'
          ? 'linear-gradient(135deg,#3B82F6,#2563EB)'
          : status === 'Cancelled'
          ? 'linear-gradient(135deg,#EF4444,#DC2626)'
          : 'linear-gradient(135deg,#F59E0B,#D97706)',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
    })
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-14 h-14 border-4 border-black border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
        <p className="text-[11px] font-black tracking-widest uppercase italic">
          Securing Order Vault...
        </p>
      </motion.div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-14"
        >
          <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">
            Order <span className="text-gray-300">Vault</span>
          </h1>
          <p className="text-xs font-bold tracking-widest text-gray-400 mt-2">
            REAL-TIME ORDER MANAGEMENT
          </p>
          <div className="h-1 w-24 bg-black mt-4"></div>
        </motion.div>

        {/* TABLE */}
        <div style={styles.glassCard} className="rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Client</th>
                  <th style={styles.tableHeader}>Manifest</th>
                  <th style={styles.tableHeader}>Volume</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={{ ...styles.tableHeader, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                    className="border-b border-gray-100 hover:bg-white transition-all"
                  >

                    {/* CLIENT */}
                    <td className="p-6">
                      <p className="text-xs font-black uppercase">
                        {order.userId?.name || "Private Client"}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {order.userId?.email}
                      </p>
                    </td>

                    {/* MANIFEST */}
                    <td className="p-6">
                      <div className="flex flex-wrap gap-1">
                        {order.products.map((p, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-black bg-black text-white px-2 py-1 uppercase rounded-sm"
                          >
                            {p.quantity}x {p.name}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* VOLUME */}
                    <td className="p-6 font-black text-sm">
                      ₹{order.totalAmount?.toLocaleString()}
                    </td>

                    {/* STATUS */}
                    <td className="p-6">
                      <span style={styles.statusBadge(order.status)}>
                        {order.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="p-6 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="bg-transparent border-b-2 border-black text-[10px] font-black uppercase tracking-widest pb-1 outline-none cursor-pointer hover:opacity-60"
                      >
                        <option value="Order Confirmed">Confirm</option>
                        <option value="Shipped">Dispatch</option>
                        <option value="Delivered">Deliver</option>
                        <option value="Cancelled">Void</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
