
function createDate() {
    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    const createdDate = year + '-' + month + '-' + day;
    return createdDate;
}
module.exports = {
    createDate,
}