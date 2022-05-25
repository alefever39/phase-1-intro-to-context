let rawEmployeeData = [['t', 'b', 'a', 3], ['r', 'd', 's', 4]]
let allEmployeeRecords=[]
createEmployeeRecords(rawEmployeeData)

allEmployeeRecords = allEmployeeRecords.map(record => createTimeInEvent(record, '2022-05-24 0500'))
allEmployeeRecords = allEmployeeRecords.map(record => createTimeOutEvent(record, '2022-05-24 1200'))
allEmployeeRecords = allEmployeeRecords.map(record => createTimeInEvent(record, '2022-05-25 0500'))
allEmployeeRecords = allEmployeeRecords.map(record => createTimeOutEvent(record, '2022-05-25 1200'))
console.log(allEmployeeRecords)

console.log(calculatePayroll(allEmployeeRecords))



function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(rawEmployeeData) {
    allEmployeeRecords = rawEmployeeData.map(singleEmployee => createEmployeeRecord(singleEmployee))
    return rawEmployeeData.map(singleEmployee => createEmployeeRecord(singleEmployee))
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let dateStampSplit = dateStamp.split(' ')
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(dateStampSplit[1]),
        date: dateStampSplit[0]
    }
    employeeRecord.timeInEvents = [...employeeRecord.timeInEvents, timeInEvent]
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let dateStampSplit = dateStamp.split(' ')
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(dateStampSplit[1]),
        date: dateStampSplit[0]
    }
    employeeRecord.timeOutEvents = [...employeeRecord.timeOutEvents, timeOutEvent]
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const dateIn = employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date === date)
    const timeIn = dateIn.hour
    const dateOut = employeeRecord.timeOutEvents.find(timeOutEvent => timeOutEvent.date === date)
    const timeOut = dateOut.hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    return hoursWorked*employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(timeInEvent => timeInEvent.date)
    return datesWorked.reduce((total, date) => { 
        return total += wagesEarnedOnDate(employeeRecord, date)
    }, 0)
}

function calculatePayroll(allEmployeeRecords){
    return allEmployeeRecords.reduce((acc, employeeRecord) => acc + allWagesFor(employeeRecord), 0)
}