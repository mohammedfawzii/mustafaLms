(function ($) {
    "use strict";


    /*-----------------------------*/


    var data = {
        labels: ['facebook', 'twitter', 'youtube', 'google plus'],
        series: [{
            value: 20,
            className: "bg-facebook"
        },
            {
                value: 10,
                className: "bg-twitter"
            },
            {
                value: 30,
                className: "bg-youtube"
            },
            {
                value: 40,
                className: "bg-google-plus"
            }]
        //        colors: ["#333", "#222", "#111"]
    };

    var options = {
        labelInterpolationFnc: function (value) {
            return value[0]
        }
    };

    var responsiveOptions = [
        ['screen and (min-width: 640px)', {
            chartPadding: 30,
            labelOffset: 100,
            labelDirection: 'explode',
            labelInterpolationFnc: function (value) {
                return value;
            }
        }],
        ['screen and (min-width: 1024px)', {
            labelOffset: 80,
            chartPadding: 20
        }]
    ];

    new Chartist.Pie('.ct-pie-chart', data, options, responsiveOptions);


    /*----------------------------------*/

    var data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
            [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4],
            [4, 6, 3, 9, 6, 5, 2, 8, 3, , 5, 4],
        ]
    };

    var options = {
        seriesBarDistance: 10
    };

    var responsiveOptions = [
        ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function (value) {
                    return value[0];
                }
            }
        }]
    ];

    new Chartist.Bar('.ct-bar-chart', data, options, responsiveOptions);


})(jQuery);


$(document).ready(function ($) {
    $(".clickable-row").click(function () {
        window.location = $(this).data("href");
    });
});

function searchInputTable(tdNumber = 4,tdNumber2 = 3) {
    let inputTable, dataInput, tableInput, trTable, tdTable, i, finall;
    inputTable = document.querySelector('.searchTable'),
        dataInput = inputTable.value.toLowerCase(),
        tableInput = document.querySelector('.studentTable'),
        trTable = document.querySelectorAll('.studentTable tr');
    for (i = 0; i <= trTable.length; i++) {
        if (trTable[i]) {
            tdTable = trTable[i].getElementsByTagName('td')[tdNumber];
            tdTable2 = trTable[i].getElementsByTagName('td')[tdNumber2];
            if (tdTable) {
                finall = tdTable.textContent || tdTable.innerText;
                finall2 = tdTable2.textContent || tdTable.innerText;
                if (finall.toLowerCase().indexOf(dataInput) > -1 || finall2.toLowerCase().indexOf(dataInput) > -1) {
                    trTable[i].style.display = "";
                } else {
                    trTable[i].style.display = "none";
                }
            }
        }


    }
}


let tableFilter = document.querySelector('.studentTable'),
    trTableFilter = tableFilter.getElementsByTagName("tr"),
    theSelectFilter = document.querySelector('.filterSelect'),
    tdTableFilter, i, resultTable;

function showUnActiveStudents() {
    for (i = 0; i < trTableFilter.length; i++) {
        if (theSelectFilter.selectedIndex === 2) {
            trTableFilter[i].style.display = 'table-row';
            tdTableFilter = trTableFilter[i].getElementsByTagName('td')[0];
            if (tdTableFilter) {
                resultTable = tdTableFilter.textContent || tdTableFilter.innerText;
                if (parseInt(resultTable) === 0) {
                    trTableFilter[i].style.display = '';
                } else if (parseInt(resultTable) === 1) {
                    trTableFilter[i].style.display = 'none';
                }
            }
        } else if (theSelectFilter.selectedIndex === 3) {
            trTableFilter[i].style.display = 'table-row';
            tdTableFilter = trTableFilter[i].getElementsByTagName('td')[3];
            if (tdTableFilter) {
                resultTable = tdTableFilter.textContent || tdTableFilter.innerText;
                if (resultTable.indexOf('لا يوجد رصيد') > -1) {
                    trTableFilter[i].style.display = '';

                } else {
                    trTableFilter[i].style.display = 'none';
                }
            }
        } else {
            trTableFilter[i].style.display = 'table-row';
        }

    }

}

function getInvoiceType() {
    let results = ["فاتورة المتجر","فاتورة منصة" ,"فاتورة الدورة تعليمية"];
    for (let i = 0; i < trTableFilter.length; i++) {
        let currentIndex = theSelectFilter.selectedIndex;
        trTableFilter[i].style.display = "table-row";
        if ( currentIndex == 2 || currentIndex == 3 || currentIndex == 4 ) {
            let tdTableFilter = trTableFilter[i].getElementsByTagName("td")[2];
            if (tdTableFilter) {
                let resultTable = tdTableFilter.textContent || tdTableFilter.innerText;
                resultTable.indexOf(results[currentIndex - 2]) > -1 ? trTableFilter[i].style.display = '' : trTableFilter[i].style.display = 'none';
            }
        }
    }
}

function getAdminDataFromCoures(route) {
    let theCourse = document.querySelector("#courseChoose").selectedIndex,
        theInput = document.querySelector("#moderator_id");
    let options = {
        method: 'GET',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8',
            'X-CSRF-TOKEN':
            document.head.querySelector("[name=csrf-token]").content
        },

    }
    fetchRes = fetch(`${route}/${theCourse}`, options);
    fetchRes.then((response) => {
        return response.json()
    })
        .then((data) => {
            theInput.value = data.name;

        });
}

function getChatgroupFromTeachers() {
    let theTeacher = document.querySelector("#teacherChoose").value,
        theSelectToInsert = document.querySelector("#chatTeacher"),
        options = {
            method: 'GET',
            headers: {
                'Content-Type':
                    'application/json;charset=utf-8',
                'X-CSRF-TOKEN':
                document.head.querySelector("[name=csrf-token]").content
            },
        };
    fetchData = fetch(`http://127.0.0.1/twaqah-project/twaqah/public/admin/students/create/get-api/teacher-group/${theTeacher}`, options);
    fetchData.then((response) => {
        return response.json()
    })
        .then((data) => {

            for (let i = 0; i <= data.groupname.length; i++) {
                theSelectToInsert.options[i] = null;
                let opt = document.createElement('option');
                opt.value = data.groupname[i].id;
                opt.innerHTML = data.groupname[i].groupname;
                theSelectToInsert.appendChild(opt);
            }
        })


}

function getTheWalletValueAndCheck() {
    let valcurrency = document.querySelectorAll('input[name="valcurrency"]'),
        walletValue = document.querySelector('input[name="wallet"]'),
        coursePrice = parseInt(document.querySelector('#courseChoose').selectedOptions[0].getAttribute('data-option'));

    walletValue.addEventListener('input', () => {
        if (parseInt(walletValue.value) > coursePrice && parseInt(walletValue.value.trim()) != "" && !isNaN(parseInt(walletValue.value.trim())) && Number.isInteger(parseInt(walletValue.value.trim())) !== false) {
            valcurrency[1].disabled = false;
            valcurrency[0].checked = true;
        } else {
            valcurrency[1].disabled = true;
            valcurrency[0].checked = true;
        }
    })
}


function openInsertStudent() {

    if (document.querySelector('input[name="terms"]').checked) {
        document.querySelector('.addnow').removeAttribute('disabled');
    } else {
        document.querySelector('.addnow').setAttribute('disabled', '')
    }

}

function getCourseAmountFromCoursesList()
{
    let courseSelect = document.querySelector('#course_id'),
        inputToAmount = document.querySelector('#course_amount'),
        courseAmount = courseSelect.options[courseSelect.selectedIndex].getAttribute('data-amount');
    inputToAmount.value = courseAmount ;
}

function getMessages(route,theTeacher) {
    let chat_history = document.querySelector('#chat_history');

    let options = {
        method: 'GET',
        headers: {
            'Content-Type':
                'application/json;charset=utf-8',
            'X-CSRF-TOKEN':
            document.head.querySelector("[name=csrf-token]").content
        },

    }
    fetchRes = fetch(`${route}/${theTeacher}`, options);
    fetchRes.then((response) => {
        return response.json()
    })
        .then((data) => {
            let history_length = chat_history.childElementCount,
            message_length = data.messages.length;
            if(history_length !==  message_length)
            {
            for (let c = history_length;c < message_length;c++) {
                if(data.messages[c].sender.indexOf('admin') > -1) {

                    let liTwo = document.createElement("li");
                    let message_data = document.createElement("div");
                    let message_data_span = document.createElement("span");
                    let my_messages = document.createElement("div");
                    liTwo.classList.add('clearfix');
                    message_data.classList.add('message-data', 'text-right')
                    my_messages.classList.add('message', 'my-message');
                    message_data_span.classList.add('message-data-time');
                    message_data_span.innerText = data.messages[c].created_at;
                    message_data.innerHTML = message_data_span.outerHTML;
                    my_messages.innerText = data.messages[c].message;
                    liTwo.appendChild(message_data);
                    liTwo.appendChild(my_messages);
                    chat_history.append(liTwo);
                    // message_data_img.src = d

                }
                if (data.messages[c].sender.indexOf('teacher') > -1) {
                    let li = document.createElement("li");
                    let message_data = document.createElement("div");
                    let message_data_span = document.createElement("span");
                    let message_data_img = document.createElement("img");
                    let other_message = document.createElement("div");
                    li.classList.add('clearfix');
                    message_data.classList.add('message-data', 'text-right')
                    other_message.classList.add('message','other-message', 'float-right')
                    message_data_span.classList.add('message-data-time');
                    message_data_span.innerText = data.messages[c].created_at;
                    message_data_img.src = 'http://127.0.0.1/twaqah-project/twaqah/public/storage/' + data.teacher.avatar;
                    message_data.innerHTML = message_data_span.outerHTML + message_data_img.outerHTML;
                    other_message.innerText = data.messages[c].message;
                    li.appendChild(message_data);
                    li.appendChild(other_message);
                    chat_history.append(li);

                    // message_data_img.src = d

                }
            }



            }




        });
}
// $(document).ready(function(){
//     // example.php will be used to send the data to the sever database
//     $('#example-1').Tabledit({
//         url: 'example.php',
//         editButton: false,
//         deleteButton: false,
//         hideIdentifier: true,
//         columns: {
//             identifier: [0, 'id'],
//             editable: [[2, 'first'], [3, 'last'],[3, 'nickname']]
//         }
//     });
//
// });
