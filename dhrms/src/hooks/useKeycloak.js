import { useEffect, useRef } from 'react';
import keycloak from '@/utils/keycloak-config';

const useKeycloak = () => {

    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current) {  
            keycloak.init({ onLoad: 'check-sso' }).then(authenticated => {
                if (!authenticated) {
                    console.log('User not authenticated');
                    keycloak.login();
                }
            }).catch(error => {
                console.error("Error during Keycloak initialization:", error);
            });

            isInitialized.current = true; 
        }
    }, []);

    return keycloak;
};

export default useKeycloak;
