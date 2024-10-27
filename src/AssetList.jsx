import { useEffect, useState } from "react";

function AssetList({ assets, onLoadAssets }) {
  const columns = ["ticker", "price", "volumn", "sector", "change_percent"];
  const [localAssets, setLocalAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAssets, setFilteredAssets] = useState([]);

  const [sortOrder, setSortOrder] = useState({
    price: true, // true means ascending
    volumn: true,
    change_percent: true,
  });

  useEffect(() => {
    onLoadAssets();
  }, []);

  useEffect(() => {
    setLocalAssets(assets);
  }, [assets]);

  useEffect(() => {
    searchAsset()
  }, [searchQuery, localAssets])

  
  function handleClick(column) {
    if (column === "sector") {
      filterAssets(column);
    } else {
      const newSortOrder = { ...sortOrder, [column]: !sortOrder[column] }; // reverse sort direction
      setSortOrder(newSortOrder);
      sortAssets(column, newSortOrder[column]);
    }
  }

  // Filter function. User can choose any filter
  function filterAssets(column) {
    
  }

  function sortAssets(column, isAscending) {
    const sortedAssets = [...localAssets].sort((a, b) => {
      if (isAscending) {
        return a[column] > b[column] ? 1 : -1;
      }

      return a[column] < b[column] ? 1 : -1;
    });

    setLocalAssets(sortedAssets);
  }

  function searchAsset() {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = localAssets.filter((asset) =>
      asset.ticker.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredAssets(filtered);
  }

  return (
    <>
        <input
          type="text"
          placeholder="Search a ticker..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

      <ul>
        <div>
          {columns.map((column) => {
            if (column === "ticker") {
              return;
            }
            return (
              <button
                className="button-title"
                type="button"
                key={column}
                onClick={() => handleClick(column)}
              >
                {column}
              </button>
            );
          })}
        </div>
        {(searchQuery ? filteredAssets : localAssets).map((asset, index) => (
          <li key={index}>
            <div>
              {asset.ticker}
              {asset.price}
              {asset.volumn}
              {asset.sector}
              {asset.change_percent}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AssetList;
