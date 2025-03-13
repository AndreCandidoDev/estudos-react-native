import { apiData } from '@/types/apiData';
import { ReactNode, createContext, useState } from 'react'

type Props = {
  children: ReactNode;
}

interface appContextType {
  data: apiData[]
  setData: React.Dispatch<React.SetStateAction<apiData[]>>
  selectedData: apiData | null
  setSelectedData: React.Dispatch<React.SetStateAction<apiData | null>>
}

const defaultProvider: appContextType = {
  data: [],
  selectedData: null,
  setData: () => {},
  setSelectedData: () => {}
}

const AppContext = createContext<appContextType>(defaultProvider)

const AppProvider = ({ children }: Props) =>
{
  const [data, setData] = useState<apiData[]>(defaultProvider.data)
  const [selectedData, setSelectedData] = useState<apiData | null>(defaultProvider.selectedData)

  const values = {
    data,
    setData,
    selectedData,
    setSelectedData
  }

  return (<AppContext.Provider value={values}>{children}</AppContext.Provider>)
}

export { AppContext, AppProvider };