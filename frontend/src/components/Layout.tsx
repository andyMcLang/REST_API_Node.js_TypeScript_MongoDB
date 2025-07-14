import { Link } from "react-router-dom";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Tuotteet</h1>
          <nav className="space-x-4">
            <Link to="/products">Etusivu</Link>
            <Link to="/products/create">Luo uusi</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
