import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    image: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:1337/api/products/${id}`)
        .then((res) => setForm(res.data))
        .catch(console.error);
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:1337/api/products/${id}`, form);
    } else {
      await axios.post("http://localhost:1337/api/products", form);
    }
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Muokkaa tuotetta" : "Luo uusi tuote"}
      </h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Otsikko"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Kuvaus"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        type="number"
        placeholder="Hinta"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Kuvan URL"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Tallenna
      </button>
    </form>
  );
}
