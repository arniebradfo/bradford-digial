import { globalHistory, HistoryActionType } from "@reach/router"
import { createContext, memo, useContext, useEffect, useState } from "react";

interface ContextProps {
    action: HistoryActionType,
    // add more stuff?
}
const defaultValue: ContextProps = {
    action: 'POP',
}

const GlobalContext = createContext(defaultValue);

interface ProviderProps {}

const _GlobalProvider: React.FC<React.PropsWithChildren<ProviderProps>> = ({ ...props }) => {

    // https://stackoverflow.com/a/57941367/5648839
    const [action, setAction] = useState<HistoryActionType>(defaultValue.action)
    useEffect(() => {
        return globalHistory.listen(({ action }) => {
            setAction(action)
        })
    }, [])

    const value = {
        action
    }

    return <GlobalContext.Provider {...{ value, ...props }} />
}
export const GlobalProvider = memo(_GlobalProvider);

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('usePopPush must be used within a PopPushProvider');
    }
    return context;
};

export const usePopPush = () => { 
    return useGlobalContext().action
}
