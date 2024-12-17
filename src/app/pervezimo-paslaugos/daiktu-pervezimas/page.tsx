export default function TemplatePage() {
    return (
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Section with gradients at the top and bottom */}
        <section className="relative bg-white text-center">
          {/* Top Gradient */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
  
          {/* Main Content */}
          <div className="py-96 px-4 relative z-10">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Informacija ruošiama
            </h1>
            <p className="text-gray-600">
              Dėkojame už kantrybę. Šis puslapis dar yra kuriamas.
              *daiktu-pervezimas , kategorija - pervezimo paslaugos
            </p>
          </div>
  
          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent"></div>
        </section>
      </main>
    );
  }
  
  
