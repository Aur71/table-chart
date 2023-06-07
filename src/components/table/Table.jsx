import { useState } from 'react';
import Pagination from './Pagination';
import React from 'react';
import { AiOutlineCaretUp, AiOutlineCaretDown } from 'react-icons/ai';

const Table = ({ data }) => {
  const [sortBy, setSortBy] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = data.sort((a, b) => {
    const aPop = parseInt(a.Population);
    const bPop = parseInt(b.Population);
    if (sortBy === 'asc') return aPop - bPop;
    else return bPop - aPop;
  });
  const handleSortByPopulation = () => {
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  const itemsPerPage = 15;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            <th>ID State</th>
            <th>State</th>
            <th>ID Year</th>
            <th>Year</th>
            <th id='population' onClick={handleSortByPopulation}>
              <button>
                Population
                {sortBy === 'asc' ? (
                  <AiOutlineCaretUp className='icon' />
                ) : (
                  <AiOutlineCaretDown className='icon' />
                )}
              </button>
            </th>
            <th>Slug State</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item['ID State']}</td>
              <td>{item['State']}</td>
              <td>{item['ID Year']}</td>
              <td>{item['Year']}</td>
              <td>{item['Population']}</td>
              <td>{item['Slug State']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={sortedData.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Table;
