import { useEffect } from 'react';
import { createHostMicroFrontendManager } from '../hostMicroFrontend';
import type { IMicroFrontendApi } from '../types/common.types';

export const useHostMicroFrontendApi = (): IMicroFrontendApi => {
  useEffect(() => {
    if (!window.hostMicroFrontendApi) {
      window.hostMicroFrontendApi = createHostMicroFrontendManager();
    }
  }, []);

  return window.hostMicroFrontendApi;
};