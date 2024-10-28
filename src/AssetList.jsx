import { useEffect, useState } from "react";

function AssetList({ assets, onLoadAssets }) {
  const columns = ["ticker", "price", "volume", "sector", "change_percent"];
  const sectors = [
    { value: "", label: "All Sectors" },
    { value: "automotive", label: "Automotive" },
    { value: "consumer goods", label: "Consumer Goods" },
    { value: "energy", label: "Energy" },
    { value: "finance", label: "Finance" },
    { value: "retail", label: "Retail" },
    { value: "telecommunications", label: "Telecommunications" },
    { value: "technology", label: "Technology" },
  ];

  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sector, setSector] = useState("");
  const [sortOrder, setSortOrder] = useState({
    price: true, // true means ascending
    volumn: true,
    change_percent: true,
  });

  useEffect(() => {
    onLoadAssets();
  }, []);

  useEffect(() => {
    filterAssets();
  }, [searchQuery, sector, assets]);

  function handleFilterSector(e) {
    setSector(e.target.value);
  }

  function filterAssets() {
    let filtered = assets;

    // Filter by sector
    if (sector) {
      filtered = filtered.filter(
        (asset) => asset.sector.toLowerCase() === sector.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((asset) =>
        asset.ticker.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredAssets(filtered);
  }

  function handleClick(column) {
    if (column !== "sector") {
      const newSortOrder = { ...sortOrder, [column]: !sortOrder[column] }; // Reverse sort direction
      setSortOrder(newSortOrder);
      sortAssets(column, newSortOrder[column]);
    }
  }

  function sortAssets(column, isAscending) {
    const sortedAssets = [...filteredAssets].sort((a, b) => {
      if (isAscending) {
        return a[column] > b[column] ? 1 : -1;
      }
      return a[column] < b[column] ? 1 : -1;
    });
    setFilteredAssets(sortedAssets);
  }

  return (
    <div className="flex flex-col md:flex-row">
      <form className="flex-1 p-4 border-r border-gray-300">
        <input
          type="text"
          placeholder="Search a ticker..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <div className="mb-4">
          <label htmlFor="select-sector" className="block mb-1">
            Select a sector:
          </label>
          <select
            name="sector"
            id="select-sector"
            onChange={handleFilterSector}
            className="p-2 border border-gray-300 rounded w-full"
          >
            {sectors.map((sector) => (
              <option key={sector.value} value={sector.value}>
                {sector.label}
              </option>
            ))}
          </select>
        </div>
      </form>

      <div className="flex-[4] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {columns.map((column) => (
                <th className="p-2 border-b-2 text-center hover:bg-gray-200 whitespace-nowrap">
                  <button
                    className="text-transform: capitalize"
                    type="button"
                    key={column}
                    onClick={() => handleClick(column)}
                  >
                    {column} {sortOrder[column] ? "↑" : "↓"}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(!!filteredAssets.length ? filteredAssets : assets).map(
              (asset, index) => (
                <tr
                  key={index}
                  className={`py-2 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  {columns.map((column) => (
                    <td key={column} className="p-2 text-center">
                      {asset[column]}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssetList;
