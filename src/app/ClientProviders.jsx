'use client';

import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from '@/store';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

export default function ClientProviders({ children }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
      </QueryClientProvider>
    </Provider>
  );
}
