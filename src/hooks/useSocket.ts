import { useEffect, useRef } from 'react';
import { useAuthStore } from '../store/authStore';
import socketService from '../services/socket';

export const useSocket = () => {
  const { user } = useAuthStore();
  const isConnected = useRef(false);

  useEffect(() => {
    if (user && !isConnected.current) {
      socketService.connect(user.id);
      isConnected.current = true;
    }

    return () => {
      if (isConnected.current) {
        socketService.disconnect();
        isConnected.current = false;
      }
    };
  }, [user]);

  return socketService;
};

export default useSocket;