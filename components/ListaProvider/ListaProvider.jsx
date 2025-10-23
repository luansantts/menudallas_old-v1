import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const ListaContext = createContext();

export function ListaProvider({ children }) {
  const [cachedData, setCachedData] = useState(null);
  const [cachedSubdomain, setCachedSubdomain] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const router = useRouter();
  
  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem('lista_cached_data');
        const storedSubdomain = localStorage.getItem('lista_cached_subdomain');
        const storedTimestamp = localStorage.getItem('lista_last_refresh');
        const storedScroll = sessionStorage.getItem('lista_scroll_position');
        
        if (storedData && storedSubdomain) {
          setCachedData(JSON.parse(storedData));
          setCachedSubdomain(storedSubdomain);
          setLastRefresh(parseInt(storedTimestamp));
        }
        
        if (storedScroll) {
          setScrollPosition(parseInt(storedScroll));
        }
      } catch (error) {
        console.error('Error loading cached data:', error);
      }
    }
  }, []);
  
  // Monitorar navegações e salvar posição de scroll
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleRouteChangeStart = () => {
        if (router.pathname === '/lista') {
          sessionStorage.setItem('lista_scroll_position', window.scrollY.toString());
          setScrollPosition(window.scrollY);
        }
      };
      
      router.events.on('routeChangeStart', handleRouteChangeStart);
      
      return () => {
        router.events.off('routeChangeStart', handleRouteChangeStart);
      };
    }
  }, [router]);
  
  // Restaurar posição de scroll quando retornar à página lista
  useEffect(() => {
    if (typeof window !== 'undefined' && router.pathname === '/lista' && scrollPosition > 0) {
      setTimeout(() => {
        window.scrollTo(0, scrollPosition);
      }, 100);
    }
  }, [router.pathname, scrollPosition]);
  
  const saveListData = (data, subdomain) => {
    setCachedData(data);
    setCachedSubdomain(subdomain);
    const timestamp = Date.now();
    setLastRefresh(timestamp);
    
    try {
      localStorage.setItem('lista_cached_data', JSON.stringify(data));
      localStorage.setItem('lista_cached_subdomain', subdomain);
      localStorage.setItem('lista_last_refresh', timestamp.toString());
    } catch (error) {
      console.error('Error saving data to cache:', error);
    }
  };
  
  const shouldRefresh = (subdomain) => {
    // Refresh se os dados forem nulos, de outro subdomínio, ou se tiverem mais de 5 minutos
    if (!cachedData || cachedSubdomain !== subdomain) return true;
    if (!lastRefresh) return true;
    
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - lastRefresh > fiveMinutes;
  };
  
  return (
    <ListaContext.Provider value={{ 
      cachedData, 
      cachedSubdomain, 
      saveListData,
      shouldRefresh,
      scrollPosition
    }}>
      {children}
    </ListaContext.Provider>
  );
}

export const useListaCache = () => useContext(ListaContext);