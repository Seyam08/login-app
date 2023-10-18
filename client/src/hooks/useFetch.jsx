import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helpers";

// base url
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_URL;

export default function useFetch(query) {
  const [data, setData] = useState({
    loading: false,
    apiRes: undefined,
    status: null,
    serverError: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, loading: true }));

        const { username } = !query ? await getUsername() : "";

        const { data, status } = !query
          ? await axios.get(`/api/user/${username}`)
          : await axios.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }

        if (status === 200) {
          setData((prev) => ({ ...prev, loading: false }));
          setData((prev) => ({ ...prev, apiRes: data, status: status }));
        }
        setData((prev) => ({ ...prev, loading: false }));
      } catch (error) {
        setData((prev) => ({ ...prev, loading: false, serverError: error }));
      }
    };

    fetchData();
  }, [query]);
  return [data];
}
