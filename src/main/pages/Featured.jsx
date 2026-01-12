import { useEffect, useState } from "react"
import adminApi from "../api/adminApi"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"
export default function Featured() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(true)
  const fetchData = async () => {
    setLoading(true)
    const res = await adminApi.get("/featured")
    setItems(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addItem = async () => {
    const fd = new FormData()
    fd.append("title", title)
    fd.append("image", image)
    fd.append("link", link)

    await adminApi.post("/featured", fd)

    // clear form
    setTitle("")
    setLink("")
    setImage(null)

    fetchData()
  }

  // ✅ DELETE FEATURED
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this featured item?")) return

    try {
      await adminApi.delete(`/featured/${id}`)
      setItems(prev => prev.filter(item => item._id !== id))
    } catch (err) {
      alert("Failed to delete featured item")
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <h2>Featured</h2>
        {loading?<Loader/>:(

      <>

        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="Link"
          value={link}
          onChange={e => setLink(e.target.value)}
        />

        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />

        <button onClick={addItem}>Add</button>

        <hr />

        {items.map(i => (
          <div
            key={i._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <img src={i.image} width="150" />
            <p>{i.title}</p>

            {/* ✅ DELETE BUTTON */}
            <button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteItem(i._id)}
            >
              Delete
            </button>
          </div>
        ))}
        </>
        )}
      </div>
    </>
  )
}
