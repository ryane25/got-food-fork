import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Map from "../components/Map";
//import Filter from "../components/MapFilters";
//import Menu from "../components/MapMenu";

function SearchPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "white",
      }}
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
