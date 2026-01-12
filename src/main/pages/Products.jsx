import { useEffect, useState } from "react"

import Navbar from "../components/Navbar"

import adminApi from "../api/adminAPi"
import Loader from "../components/Loader"






export default function Products() {

  const [products, setProducts] = useState([])
  const [loading,setLoading]=useState(true)



  const [name, setName] = useState("")

  const [price, setPrice] = useState("")

  const [description, setDescription] = useState("")

  const [category, setCategory] = useState("")

  const [image, setImage] = useState(null)



  // FETCH PRODUCTS

  const fetchProducts = async () => {
setLoading(true)
try{
    const res = await adminApi.get("/products")
     console.log("Database Response:", res.data)

    setProducts(res.data)

}finally{
  setLoading(false)
}


  }



  useEffect(() => {

    fetchProducts()

  }, [])



  // ADD PRODUCT

const addProduct = async () => {

  const formData = new FormData()

  formData.append("name", name)

  formData.append("price", price)

  formData.append("description", description)

  formData.append("category", category)

  formData.append("image", image)



  try {

    await adminApi.post("/products", formData)

    alert("Product added successfully!")

   

    // Clear the form fields

    setName("")

    setPrice("")

    setCategory("")

    setDescription("")

   

    // Refresh the list

    fetchProducts()

  } catch (error) {

    console.error("Error adding product:", error)

    alert("Failed to add product.")

  }

}

  // DELETE PRODUCT

const deleteProduct = async (id) => {

  if (window.confirm("Are you sure you want to delete this product?")) {

    try {

      // Check if your backend route matches this exactly

      await adminApi.delete(`/admin/products/${id}`);

     

      // Update the UI after successful delete

      setProducts(products.filter(p => p._id !== id));

      alert("Product deleted successfully");

    } catch (error) {

      console.error("Delete Error:", error.response?.data || error.message);

      alert(error.response?.data?.message || "Could not delete product. It might have already been removed.");

    }

  }

};



  return (
// ... inside your return statement

  <>
    <Navbar />
    <div className="admin-container">
      <h2>Product Inventory</h2>
{loading ?(
  <Loader/>):(
    <>
    
      {/* Form Section */}
      <div className="admin-card" style={{marginBottom: '2rem'}}>
        <h3 style={{marginBottom: '1rem'}}>Add New Product</h3>
        <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
        <div style={{display: 'flex', gap: '10px'}}>
            <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        </div>
        <textarea placeholder="Description" rows="3" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="file" onChange={e => setImage(e.target.files[0])} />
        <button className="btn-primary" onClick={addProduct}>Create Product</button>
      </div>

      {/* List Section */}
      <div className="admin-grid">
        {products.map(p => (
          <div key={p._id} className="admin-card">
            <img src={p.image} alt={p.name} />
            <div>
              <h4 style={{fontSize: '1.1rem'}}>{p.name}</h4>
              <p style={{color: 'var(--text-muted)', fontSize: '0.8rem'}}>{p.category}</p>
              <p style={{fontWeight: 'bold', margin: '0.5rem 0'}}>₹{p.price}</p>
            </div>
            <button className="btn-danger" onClick={() => deleteProduct(p._id)}>Remove</button>
          </div>
        ))}
      </div>
      </>
  )}
    </div>
  </>


  )

}
