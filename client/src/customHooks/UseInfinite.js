import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import api from '../api'

function UseInfinite(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      query.limite= page
      const res = await api.getAllExperiencias(query)      
      setList((prev) => [...prev, ...res.data.data]);
      console.log("query "+ query.tema)
      console.log("page "+ page)
      console.log("lista "+ list.length)
      console.log("lista "+ list)
      setLoading(false)
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    sendQuery(query);
  }, [query, sendQuery, page]);

  return { loading, error, list };
}

export default UseInfinite;