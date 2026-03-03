import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Map from "../components/Map";

function SearchPage() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <Navbar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Map />
      </main>
    </div>
  );
}

export default SearchPage;
