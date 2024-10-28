import { useEffect, useState } from "react";

function AssetList({ assets, onLoadAssets }) {
  const columns = ["ticker", "price", "volumn", "sector", "change_percent"];
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
    <>
      <form className="control-panel">
        <input
          type="text"
          placeholder="Search a ticker..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <label htmlFor="select-sector">Select a sector:</label>
          <select
            name="sector"
            id="select-sector"
            onChange={handleFilterSector}
          >
            {sectors.map((sector) => (
              <option key={sector.value} value={sector.value}>
                {sector.label}
              </option>
            ))}
          </select>
        </div>

        {/* TODO */}
        <div>
          <label htmlFor="">Price</label>
        </div>
        <label htmlFor="">Volumn</label>
        <label htmlFor="">Change</label>
      </form>

      <ul>
        <div>
          {columns.map((column) => {
            if (column === "ticker") {
              return null;
            }
            return (
              <button
                className="button-title"
                type="button"
                key={column}
                onClick={() => handleClick(column)}
              >
                {column} {sortOrder[column] ? "↑" : "↓"}
              </button>
            );
          })}
        </div>

        {(!!filteredAssets.length ? filteredAssets : assets).map(
          (asset, index) => (
            <li key={index}>
              <div>
                {asset.ticker}
                {asset.price}
                {asset.volumn}
                {asset.sector}
                {asset.change_percent}
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
}

export default AssetList;