import "./App.css";
import WeddingHeader from "./components/WeddingHeader";
import FileUploader from "./components/FileUploader";
import WeddingBackground from "./components/WeddingBackground";

function App() {
  // Wedding details - can be customized
  const coupleNames = "Mohsan & Salma";
  const weddingDate = "October 18, 2025";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <WeddingBackground />

      <div className="relative z-10 py-4">
        <div className="mb-6">
          <h2 className="text-3xl text-[#a98467]">Wedding Memories</h2>
        </div>

        <WeddingHeader coupleNames={coupleNames} weddingDate={weddingDate} />

        <FileUploader coupleNames={coupleNames} weddingDate={weddingDate} />

        <footer className="mt-12 text-center text-[#a98467]/70 font-light border-t border-[#d2b48c]/20 pt-4">
          <p>Forever & Always</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
