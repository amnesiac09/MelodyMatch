export const formatDate = (date: Date) => {

    const yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString()
    let dd = (date.getDate()).toString()

    if (Number(dd) < 10) dd = '0' + dd
    if (Number(mm) < 10) mm = '0' + mm

    const formattedDate = dd + '/' + mm + '/' + yyyy;

    return formattedDate
}
export const formatDateToAMPM = (date: Date) => {
    date = new Date(date)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
}