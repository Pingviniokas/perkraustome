const DetailedQuote = ({ data }) => {
    const {
      selectedVehicle,
      distance,
      isInVilnius,
      price,
      loaders,
      hours
    } = data;
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Detalus pasiūlymas</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p><strong>Transporto priemonė:</strong> {selectedVehicle}</p>
          <p><strong>Atstumas:</strong> {distance} km</p>
          <p><strong>Vieta:</strong> {isInVilnius ? 'Vilniaus mieste' : 'Už Vilniaus ribų'}</p>
          {loaders > 0 && <p><strong>Krovikų skaičius:</strong> {loaders}</p>}
          {hours > 0 && <p><strong>Valandų skaičius:</strong> {hours}</p>}
          <p className="text-xl font-semibold mt-2"><strong>Kaina:</strong> {price}</p>
        </div>
        <p className="text-sm text-gray-600">
          * Galutinė kaina gali skirtis priklausomai nuo papildomų paslaugų ar nenumatytų aplinkybių.
        </p>
      </div>
    );
  };
  
  export default DetailedQuote;
  