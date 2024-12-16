import Image from 'next/image';
import { useState } from 'react';

const MovingPage = () => {
  const [quote, setQuote] = useState({
    from: '',
    to: '',
    date: '',
    size: 'small', // small, medium, large
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuote({ ...quote, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the quote data to your backend
    console.log('Quote submitted:', quote);
    alert('Quote submitted! (This is a demo)');
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Hero Section */}
      <header className="relative h-[60vh] md:h-[80vh] bg-cover bg-center" style={{ backgroundImage: `url('/moving-hero.jpg')` }}> {/* Replace with your hero image */}
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">Your Trusted Moving Partner</h1>
            <p className="text-lg md:text-xl mb-8">Stress-free moves, every time.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md">
              Get a Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* Quote Section */}
      <section className="bg-white py-12 px-6 md:px-24 shadow-md relative -mt-16 md:-mt-24 z-10 rounded-lg mx-4 md:mx-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-800">Get Your Free Moving Quote</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="from" className="block text-gray-700 font-medium mb-2">Moving From:</label>
            <input type="text" id="from" name="from" value={quote.from} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300" required />
          </div>
          <div>
            <label htmlFor="to" className="block text-gray-700 font-medium mb-2">Moving To:</label>
            <input type="text" id="to" name="to" value={quote.to} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300" required />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Moving Date:</label>
            <input type="date" id="date" name="date" value={quote.date} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300" required />
          </div>
          <div>
            <label htmlFor="size" className="block text-gray-700 font-medium mb-2">Move Size:</label>
            <select id="size" name="size" value={quote.size} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300">
              <option value="small">Small (Apartment/Studio)</option>
              <option value="medium">Medium (2-3 Bedroom House)</option>
              <option value="large">Large (4+ Bedroom House)</option>
            </select>
          </div>
          <div className="md:col-span-2 text-center">
            <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md">Submit Quote</button>
          </div>
        </form>
      </section>

      {/* Services Section (Example) */}
      <section className="py-12 px-6 md:px-24 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-gray-800">Our Services</h2>
        {/* Add your service cards here */}
      </section>
      {/* Footer */}
       <footer className="bg-black text-white py-6 px-6 md:px-24 text-center">
        <p>&copy; {new Date().getFullYear()} Your Moving Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MovingPage;