import moment from 'moment'

export const prepareTrades = (trades = []) => {

    return trades.map(
        (event) => ({
            ...event,
            fecha: moment(event.fecha).toDate() 
            
        })
    )
}