import { useState, useEffect } from 'react';
import Table from './components/table/Table';
import Loading from './components/loading/Loading';
import Error from './components/error/Error';
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
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <main className='app'>
      <Table data={data} />
      <Chart data={data} />
    </main>
  );
}

export default App;
