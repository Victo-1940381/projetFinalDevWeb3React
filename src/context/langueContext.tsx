import Francais from '../lang/fr.json';
import Anglais from '../lang/en.json';
import { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
export type LangueContextType = {
    locale: string;
    switchlangue:()=>void;
};
export const LangueContext = createContext<LangueContextType>({
    locale: 'fr',
    switchlangue:() =>{},
});

export default function LangueProvider(props:any){
    const [locale,setLocale] = useState('fr');
    const [messages,setMessage] = useState(Francais);
    function switchlangue(){
        if (locale == 'fr'){
            setLocale('en');
            setMessage(Anglais);
        }
        else if(locale == 'en'){
            setLocale('fr');
            setMessage(Francais);
        }
    }
    const values = {locale,switchlangue};
    return(
        <LangueContext.Provider value={values}>
            <IntlProvider locale={locale} messages={messages}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                    {props.children}
                </LocalizationProvider>
            </IntlProvider>
        </LangueContext.Provider>
    )
}