
export function getMessageDateAndTime(item) {
    const date = item.split("T");
    const dateTime  = date[0] + " / " + date[1].slice(0, -5);

    return dateTime
} 