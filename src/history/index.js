import React, { useState, useEffect } from "react";
import { fetchCurrentUserProfile } from "../services/cur-user-service";
import HistoryItem from "./history-item";
import HeadBar from "../home/head-bar";

const History = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUserProfile = await fetchCurrentUserProfile();
      setItems(currentUserProfile.history);
    };

    fetchData();
    console.log(items);
  }, []);

  return (
    <div>
      <HeadBar />
      <div className="border border-2 p-3 t-3">
        <h2 className="mt-3 mb-3 fw-bolder">Search History</h2>
        {items.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default History;
