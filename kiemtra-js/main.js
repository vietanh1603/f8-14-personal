// Teams
const teams = [
    { id: 1, name: "Reactjs" },
    { id: 2, name: "Expressjs" },
    { id: 3, name: "Nestjs" }
];

// Employees
const employees = [
    { id: 1, name: "Nguyen Minh Viet", teamId: 1 },
    { id: 2, name: "Tran Thuy Quynh", teamId: 2 },
    { id: 3, name: "Tran Cong Tin", teamId: 1 },
    { id: 4, name: "Nguyen Nam Tao", teamId: 2 },
    { id: 5, name: "Bui Kong Minh", teamId: 3 }
];

// Absence Times
const absences = [
    { id: 1, employeeId: 1, date: "mon", time: "8:00-9:00" },
    { id: 2, employeeId: 1, date: "tue", time: "16:00-17:00" },
    { id: 3, employeeId: 3, date: "thu", time: "11:00-12:00" },
    { id: 4, employeeId: 2, date: "wed", time: "11:00-12:00" },
    { id: 5, employeeId: 5, date: "fri", time: "9:00-11:00" },
    { id: 6, employeeId: 3, date: "mon", time: "8:00-9:00" }
];

const tableBody = document.querySelector('table tbody');

// render tbody

const listEmployee = employees.map(emp => {
    const team = teams.find(team => emp.teamId === team.id)
    const monDuration = absences.find(a => a.date === 'mon' && a.employeeId === emp.id)?.time || 'Full Day'
    const tueDuration = absences.find(a => a.date === 'tue' && a.employeeId === emp.id)?.time || 'Full Day'
    const wedDuration = absences.find(a => a.date === 'wed' && a.employeeId === emp.id)?.time || 'Full Day'
    const thuDuration = absences.find(a => a.date === 'thu' && a.employeeId === emp.id)?.time || 'Full Day'
    const friDuration = absences.find(a => a.date === 'fri' && a.employeeId === emp.id)?.time || 'Full Day'
    return {id:emp.id,name:emp.name, team: team.name, mon: monDuration, tue: tueDuration, wed: wedDuration, thu: thuDuration, fri: friDuration};
})

const schedule = absences.map(day => {
    const EmployeeOff = listEmployee.find((emp) => emp.id === day.employeeId);
    return {...EmployeeOff,date:day.date, time: day.time};
})
// TAO BANG
listEmployee.forEach(emp => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.team}</td>
        <td>${emp.mon}</td>
        <td>${emp.tue}</td>
        <td>${emp.wed}</td>
        <td>${emp.thu}</td>
        <td>${emp.fri}</td>`
    tableBody.appendChild(row);
})








