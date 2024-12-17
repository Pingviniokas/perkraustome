const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h1>Privatumo politika</h1>
      
      <h2>Kas mes esame</h2>
      <p>Mūsų tinklalapio adresas yra: https://www.mesjaucia.lt</p>
      
      <p>
        <strong>
          Brangūs mūsų Klientai, MB „Liumikas" svarbu teikti aukščiausios kokybės paslaugas Jums. 
          Todėl mums reikia tvarkyti Jūsų asmens duomenis, remiantis MB „Liumikas" ASMENS DUOMENŲ 
          TVARKYMO POLITIKA, kuri yra aprašyta žemiau. Mes užtikriname Jūsų asmens duomenų apsaugą ir privatumą.
        </strong>
      </p>

      <h2>Asmens duomenų tvarkymo politikoje naudojamos sąvokos</h2>
      <ul>
        <li><strong>BDAR (Bendrasis duomenų apsaugos reglamentas)</strong> – Europos Parlamento ir Tarybos reglamentas (ES) 2016/679</li>
        <li><strong>Asmens duomenys</strong> – bet kokia informacija apie fizinį asmenį, kurio tapatybė nustatyta arba kurio tapatybę galima nustatyti</li>
        <li><strong>Duomenų valdytojas</strong> – MB „Liumikas"</li>
        <li><strong>Duomenų tvarkytojas</strong> – fizinis arba juridinis asmuo, kuris tvarko asmens duomenis valdytojo vardu</li>
        <li><strong>Politika</strong> – ši Asmens duomenų tvarkymo politika</li>
      </ul>

      <h2>Kokius duomenis tvarkome?</h2>
      <ul>
        <li>Vardas</li>
        <li>Pavardė</li>
        <li>Telefono numeris</li>
        <li>Gyvenamosios vietos adresas</li>
        <li>Elektroninio pašto adresas</li>
        <li>Pristatymo adresas</li>
        <li>Atsiskaitomosios sąskaitos numeris</li>
      </ul>

      <h2>Slapukai</h2>
      <table>
        <thead>
          <tr>
            <th>Pavadinimas</th>
            <th>Tikslas</th>
            <th>Saugojimo laikas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga</td>
            <td>Statistikai apie vartotojų elgseną</td>
            <td>2 metai</td>
          </tr>
          <tr>
            <td>_gid</td>
            <td>Informacijai apie lankytus puslapius</td>
            <td>24 val.</td>
          </tr>
          <tr>
            <td>_gat_gtag</td>
            <td>Naršymo statistikai</td>
            <td>1 minutė</td>
          </tr>
        </tbody>
      </table>

      <h2>Jūsų teisės</h2>
      <ol>
        <li>Susipažinti su tvarkomais asmens duomenimis</li>
        <li>Reikalauti ištaisyti duomenis</li>
        <li>Apriboti duomenų tvarkymą</li>
        <li>Prieštarauti duomenų tvarkymui</li>
        <li>Prašyti ištrinti duomenis</li>
        <li>Nesutikti su profiliavimu</li>
      </ol>

      <p>
        Klausimais dėl asmens duomenų tvarkymo kreipkitės el. paštu: info@mesjaucia.lt 
        arba adresu: OZO g. 12A, Technopolis (Penta) Vilnius
      </p>
    </div>
  );
};

export default PrivacyPolicy;
