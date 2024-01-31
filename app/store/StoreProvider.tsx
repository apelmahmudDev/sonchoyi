'use client'
import { Provider } from 'react-redux'
import { store } from '.'

const StoreProvider = (props: { children: React.ReactNode }) => {
  return <Provider store={store}>{props.children}</Provider>
}

export default StoreProvider
