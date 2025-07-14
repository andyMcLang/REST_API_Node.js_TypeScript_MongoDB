import { Routes, Route, Navigate } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm />} />
      </Routes>
    </Layout>
  );
}

export default App;
