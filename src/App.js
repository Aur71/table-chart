import { useState, useEffect } from 'react';
import Table from './components/table/Table';
import Chart from './components/chrat/Chart';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setData([]);
        const response = await fetch(
          'https://datausa.io/api/data?drilldowns=State&measures=Population'
        );
        const parsedData = await response.json();
        setData(parsedData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }
  if (error) {
    return (
      <main>
        <h1>Error</h1>
      </main>
    );
  }

  return (
    <main className='app'>
      <Table data={data} />
      <Chart data={data} />
    </main>
  );
}

export default App;
