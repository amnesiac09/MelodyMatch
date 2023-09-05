export const formatDate = (date: Date) => {

    const yyyy = date.getFullYear();
    let mm = (date.getMonth() + 1).toString()
    let dd = (date.getDate()).toString()

    if (Number(dd) < 10) dd = '0' + dd
    if (Number(mm) < 10) mm = '0' + mm

    const formattedDate = dd + '/' + mm + '/' + yyyy;

    return formattedDate
}
export const formatTime = (date: Date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()

    console.log(hours, minutes)

    return hours

    // const yyyy = date.getFullYear();
    // let mm = (date.getMonth() + 1).toString()
    // let dd = (date.getDate()).toString()

    // if (Number(dd) < 10) dd = '0' + dd
    // if (Number(mm) < 10) mm = '0' + mm

    // const formattedDate = dd + '/' + mm + '/' + yyyy;

    // return formattedDate
}