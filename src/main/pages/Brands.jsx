import { useEffect, useState } from "react"
import adminApi from "../api/adminApi"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"
export default function Brands() {
  const [brands, setBrands] = useState([])
  const [name, setName] = useState("")
  const [logo, setLogo] = useState(null)
  const [loading, setLoading] = useState(true)
  const fetchBrands = async () => {
    setLoading(true)
    const res = await adminApi.get("/brands")
    setBrands(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchBrands()
  }, [])

  const addBrand = async () => {
    const formData = new FormData()
    formData.append("name", name)
    formData.append("logo", logo)

    await adminApi.post("/brands", formData)

    // clear form
    setName("")
    setLogo(null)

    fetchBrands()
  }

  // ✅ DELETE BRAND
  const deleteBrand = async (id) => {
    if (!window.confirm("Delete this brand?")) return

    try {
      await adminApi.delete(`/brands/${id}`)
      setBrands(prev => prev.filter(b => b._id !== id))
    } catch (err) {
      alert("Failed to delete brand")
    }
  }

  return (
    <>
      <Navbar />
      <div>
        <h2>Brands</h2>
        {loading?<Loader/>:(

       <>

        <input
          placeholder="Brand name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="file"
          onChange={e => setLogo(e.target.files[0])}
        />

        <button onClick={addBrand}>Add</button>

        <hr />

        {brands.map(b => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <img src={b.logo} width="100" />
            <p>{b.name}</p>

            {/* ✅ DELETE BUTTON */}
            <button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteBrand(b._id)}
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
