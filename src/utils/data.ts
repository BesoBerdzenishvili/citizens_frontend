import axios from "axios";
import create from "zustand";

type Data = {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
};

type Store = {
  data: Data[];
  setData: (data: Data[]) => void;
};

const useDataStore = create<Store>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));

const url = "http://localhost:3000/data";

export const useData = () => {
  const { data, setData } = useDataStore();

  const fetchData = async () => {
    try {
      const response = await axios.get<Data[]>(url);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataById = async (id: number) => {
    try {
      const response = await axios.get<Data>(`${url}/${id}`);
      setData([response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const createData = async (newData: Data) => {
    try {
      await axios.post(url, newData);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async (updatedData: Data) => {
    try {
      await axios.put(`${url}/${updatedData.id}`, updatedData);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id: number) => {
    try {
      await axios.delete(`${url}/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return { data, fetchData, fetchDataById, createData, updateData, deleteData };
};
