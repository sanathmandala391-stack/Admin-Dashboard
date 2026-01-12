import { useEffect, useState } from "react"
import adminApi from "../api/adminAPi"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"
export default function Heroes() {
  const [heroes, setHeroes] = useState([])
  const [title, setTitle] = useState("")
  const [image, setImage] = useState(null)
 const [loading, setLoading] = useState(true)
 
  const fetchHeroes = async () => {
    setLoading(true)
    const res = await adminApi.get("/heroes")
    setHeroes(res.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchHeroes()
  }, [])

  const addHero = async () => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("image", image)

    await adminApi.post("/heroes", formData)
    fetchHeroes()
  }

  const deleteHero = async id => {
    await adminApi.delete(`/heroes/${id}`)
    fetchHeroes()
  }

  return (
    <>
    <Navbar/>
    <div>
      <h2>Heroes</h2>
      {loading?<Loader/>:(
    <>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <button onClick={addHero}>Add</button>

      {heroes.map(h => (
        <div key={h._id}>
          <img src={h.image} width="200" />
          <p>{h.title}</p>
          <button onClick={() => deleteHero(h._id)}>Delete</button>
        </div>
      ))}
      </>
      )}
    </div>
    </>
  )
}
