/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Elena Khoroshun Student ID: 101908168 Date: 24 January 2018
*
*
********************************************************************************/ 



$(document).ready(function(){

let employeesModel;  

 // Defines a Lodash template to show data on the screen
let rowTemplate = _.template(
    '<% _.forEach(employees, function(employee) { %>' +
        '<div class="row body-row" data-id=<%- employee._id %>>' + 
            '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' + 
            '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' + 
            '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' + 
        '</div>' +
    '<% }); %>');

function initializeEmployeesModel() {

    $.ajax({
        url: "https://hidden-dawn-99445.herokuapp.com/employees", // This only works if the Teams API is running locally - change this url to your Heroku API (/employees) to use your API on Heroku
        method: "GET",
        //data: JSON.stringify({ some: "data" }), // we can also send data using the "data" option
        contentType: "application/json"

    })

    .done(function (data) {
        employeesModel = _.take(data, 300);  
        refreshEmployeeRows(employeesModel);
    })
    .fail(function (err) {
        showGenericModal('Error', 'Unable to get Employees');
    });
}
    function showGenericModal(title, message) 
    {
        $('#genericModal').modal({ // show the modal programmatically
            backdrop: 'static', // disable clicking on the backdrop to close
            keyboard: false // disable using the keyboard to close
        });
        $("#my-modal-title").empty();
        $("#my-modal-message").empty();
        $('#my-modal-title').text(title);
        $('#my-modal-message').html(message);
        console.log(showGenericModal);
    }

    function refreshEmployeeRows(employees){
                
        let rows = rowTemplate({ 'employees': employees});
        let employeeTable = $("#employees-table");
        employeeTable.empty();
        employeeTable.append(rows);
    }

    function getFilteredEmployeesModel(filterString) {

        let filterString = _.filter(employeesModel, function(employee){
            if(employee.FirstName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 || 
            employee.LastName.toUpperCase().indexOf(filterString.toUpperCase()) != -1 || 
            employee.Position.PositionName.toUpperCase().indexOf(filterString.toUpperCase()) != -1)
            {
                return true;
            }
            else
            {
                return false;
            }
        })
        return filterData;

    }

    function getEmployeeModelById(id) {
        let findIndex = _.findIndex(employeesModel, function(employee){
            return employee._id===id;
        })
        if (findIndex != -1) return 
        _.cloneDeep(employeesModel[findIdx]);
       
    }

    initializeEmployeesModel();
    
    
    $("#employee-search").on("keyup", function(){
        let searchText = $("#employee-search").val();
        refreshEmployeeRows(getFilteredEmployeesModel(searchText));
    })
    $(".bootstrap-header-table").on("click", ".body-row", function() {

      
        let $empId = $(this).attr("data-id");
        let clickedEmpoyee = getEmployeeModelById($empId);

        let hireDateStr = moment(clickedEmpoyee.hireDate).format("LL");            
        clickedEmpoyee.HireDate = hireDateStr;

        let modalTemplate = _.template(
            '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %> <%- employee.AddressState %> <%- employee.AddressZip %><br>' +
            '<strong>Phone Number:</strong> <%-employee.PhoneNum %><br>' + 
            '<strong>Hire Date:</strong> <%- employee.HireDate %>');
        
        // show employee detail 
        showGenericModal(
            clickedEmpoyee.FirstName + " " + clickedEmpoyee.LastName, 
            modalTemplate({ 'employee':clickedEmpoyee })
        );
    });


})