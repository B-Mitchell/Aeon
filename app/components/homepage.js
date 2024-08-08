import Head from 'next/head';

export default function Homepage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Head>
        <title>Land Information Management System</title>
        <meta name="description" content="A computerized land information management system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center px-6">
            <h1 className="text-4xl font-bold mb-4">Welcome to Aeon System</h1>
            <p className="text-lg mb-8">Manage and view land information with ease and efficiency.</p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200">Add New Record</button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200">View Existing Records</button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-semibold mb-8">About Us</h2>
            <p className="text-lg leading-relaxed">
              LandInfo is a comprehensive land information management system designed to streamline the process of managing land records, generating reports, and visualizing data through interactive maps.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto text-center px-6">
            <h2 className="text-3xl font-semibold mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Search Land Records</h3>
                <p>Quickly search and access land records with an efficient search functionality.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Interactive Maps</h3>
                <p>Visualize land data with interactive and user-friendly maps.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Detailed Reports</h3>
                <p>Create and download comprehensive reports on land data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Documents Section */}
        <section id="documents" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Documents and Records</h2>
            <ul className="list-disc pl-5 bg-white p-4 rounded shadow">
              <li><a href="#" className="text-blue-600 hover:underline">Parcel_1234_Description.pdf</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Lease_Agreement_5678.docx</a></li>
              <li><a href="#" className="text-blue-600 hover:underline">Maintenance_Log_2024.xlsx</a></li>
            </ul>
          </div>
        </section>

        {/* Help and Support Section */}
        <section id="support" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-4">Help and Support</h2>
            <div className="bg-white p-4 rounded shadow">
              <div className="mb-4">
                <h3 className="text-lg font-medium">Help Center</h3>
                <p><a href="#" className="text-blue-600 hover:underline">Visit our Help Center for FAQs and guides.</a></p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Contact Support</h3>
                <p><a href="mailto:support@landmanagement.com" className="text-blue-600 hover:underline">Email us at support@landmanagement.com</a></p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
