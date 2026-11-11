import { createContext, useContext, useReducer } from 'react';
import { createDemoState, demoReducer, getVisibleOrders } from '../domain/orders';

const DemoContext = createContext(null);
export function DemoProvider({ children }) {
  const [state, dispatch] = useReducer(demoReducer, undefined, createDemoState);
  const user = state.users.find(u => u.id === state.activeUserId);
  const visibleOrders = getVisibleOrders(state, user);
  return <DemoContext.Provider value={{ state, user, visibleOrders, dispatch }}>{children}</DemoContext.Provider>;
}
export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error('La pantalla necesita DemoProvider');
  return context;
}
