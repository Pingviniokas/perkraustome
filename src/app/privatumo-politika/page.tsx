"use client";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Privatumo politika</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Brangūs mūsų Klientai, MB „Liumikas" svarbu teikti aukščiausios kokybės paslaugas Jums. Todėl mums reikia
            tvarkyti Jūsų asmens duomenis, remiantis MB „Liumikas" ASMENS DUOMENŲ TVARKYMO POLITIKA. Mes užtikriname Jūsų
            asmens duomenų apsaugą ir privatumą.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Company Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Kas mes esame</h2>
            <p className="text-gray-600">Mūsų tinklalapio adresas yra: https://www.mesjaucia.lt</p>
          </div>

          {/* Terms */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Sąvokos</h2>
            <div className="grid gap-4">
              {[
                {
                  term: "BDAR",
                  definition: "Europos Parlamento ir Tarybos reglamentas (ES) 2016/679"
                },
                {
                  term: "Asmens duomenys",
                  definition: "Bet kokia informacija apie fizinį asmenį, kurio tapatybė nustatyta arba kurio tapatybę galima nustatyti"
                },
                {
                  term: "Duomenų valdytojas",
                  definition: "MB „Liumikas"
                }
              ].map((item, index) => (
                <div key={index} className="flex flex-col">
                  <dt className="font-semibold text-gray-900">{item.term}</dt>
                  <dd className="text-gray-600">{item.definition}</dd>
                </div>
              ))}
            </div>
          </div>

          {/* Data Processing */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Tvarkomi duomenys</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Vardas",
                "Pavardė",
                "Telefono numeris",
                "Gyvenamosios vietos adresas",
                "Elektroninio pašto adresas",
                "Pristatymo adresas",
                "Atsiskaitomosios sąskaitos numeris"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cookies */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Slapukai</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pavadinimas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tikslas</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saugojimo laikas</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: "_ga", purpose: "Statistikai apie vartotojų elgseną", duration: "2 metai" },
                    { name: "_gid", purpose: "Informacijai apie lankytus puslapius", duration: "24 val." },
                    { name: "_gat_gtag", purpose: "Naršymo statistikai", duration: "1 minutė" }
                  ].map((cookie, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cookie.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cookie.purpose}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-600">
              Klausimais dėl asmens duomenų tvarkymo kreipkitės el. paštu: info@mesjaucia.lt arba adresu: OZO g. 12A, Technopolis (Penta) Vilnius
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
