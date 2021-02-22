import { globalHistory, HistoryActionType } from "@reach/router"
import { createContext, memo, useContext, useEffect, useState } from "react";

interface ContextProps {
    action: HistoryActionType
}
const defaultValue: ContextProps = {
    action: 'POP'
}

const PopPushContext = createContext(defaultValue);

const _PopPushProvider: React.FC<React.PropsWithChildren<{}>> = (props) => {

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

    return <PopPushContext.Provider {...{ value, ...props }} />
}
export const PopPushProvider = memo(_PopPushProvider);

export const usePopPush = () => {
    const context = useContext(PopPushContext);
    if (!context) {
        throw new Error('usePopPush must be used within a PopPushProvider');
    }
    return context;
};

