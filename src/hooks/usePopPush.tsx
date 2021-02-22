import { globalHistory, HistoryActionType } from "@reach/router"
import { useEffect, useState } from "react";

// https://stackoverflow.com/a/57941367/5648839

export function usePopPush() {
    const [action, setAction] = useState<HistoryActionType>('PUSH')

    useEffect(() => {
        return globalHistory.listen(({action}) => {
            setAction(action)
        })
    }, [])

    return action
}
