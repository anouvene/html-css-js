// Use moment.js and setting France timezone
moment.locale('fr');

/**
 * Get list of months of the current year
 * @returns {string}
 */
function choiceMonth(monthSelected) {
    var menuContent = "";
    var currentYear = new Date().getFullYear();

    // Get array of months
    var months = Array.apply(0, Array(12)).map(
        function(_,i){
            var elem    ={};
            elem.id     = parseInt(i+1);
            elem.name   = moment().month(i).format('MMMM');
            return elem;
        }
    );

    for (var i = 0; i < 12; i++) {
        // Set current month + firt letter to uppercase;
        var month = months[i]['name'];
        month = formatMonthName(month);

        // Fill each option value with month of current year
        // Set option on selected month
        if(parseInt(monthSelected) === months[i]['id']) {
            menuContent += "<option value='" +months[i]['id'] +"'"  +"selected>" + month +" "
                +moment().year(currentYear).format('YY') + "</option>";
        } else {
            menuContent += "<option value='" +months[i]['id'] +"'"  +">" + month +" "
                +moment().year(currentYear).format('YY') + "</option>";
        }
    }

    return menuContent;
}

/**
 * Calendar function wich create dynamic table
 *  and display all days of the current month
 */
function displayCalendar(monthSelected) {

    var htmlContent =""; // Calendar content
    var counter = 1; // Counter => day number

    // Current date
    var dateNow = new Date();

    // Current month, day & year
    var month = dateNow.getMonth();
    var day = dateNow.getDate();
    var year = dateNow.getFullYear();

    // Format month with two characters ex. February: 02
    // var formattedMonth = moment().month(month).format('MM');

    // Get month name ex: February
    var monthName = moment().month(month).format('MMMM');

    // First letter of month to uppercase
    monthName = formatMonthName(monthName) ;

    // Days in previous month and next one , and day of week.
    // var dateOfFirstDay = new Date(month +' 1, ' +year);
    var dateOfFirstDay = moment([year, monthSelected-1, '01'])['_d'];
    var weekdaysOfprevMonth = dateOfFirstDay.getDay();
    var weekDay = weekdaysOfprevMonth;

    // This leave a white space for days of pervious month.
    while (weekdaysOfprevMonth > 0){
        htmlContent += "<td class='monthPrev'></td>";
        weekdaysOfprevMonth--;
    }

    // Number of days
    var numOfDays = moment(year +"-" +monthSelected , "YYYY-MM").daysInMonth(); // Number of days in a month

    // Loop to build the calendar body
    while (counter <= numOfDays){

        // When to start new line.
        if (weekDay > 6){
            weekDay = 0;
            htmlContent += "</tr><tr>";
        }

        // If counter equal to current day.
        // highlight current day using the CSS class "dayNow".
        if (counter == day && moment().month(monthSelected - 1).format('M') === moment().month(month).format('M')) {
            htmlContent += "<td class='monthNow dayNow' data-day='" +counter +"' data-month='" +monthSelected;
            htmlContent += "' data-year='" +year +"'>" +counter +"</td>";
        } else {
            htmlContent += "<td class='monthNow' data-day='" +counter +"' data-month='" +monthSelected;
            htmlContent += "' data-year='" +year +"'>" +counter +"</td>";
        }

        weekDay++;
        counter++;
    }

    /* Building the calendar html body.
     * Get list of months
     * ================================= */

    // Months choice menu
    var menuContent = "<label>Mois &nbsp;</label> <select id='months'>";
    menuContent += choiceMonth(monthSelected);
    menuContent += "</select>";

    /**
     * Calendar content
     */

    // Head of calendar table
    var calendarBody = "<h1 class='calendarTitle'>Calendrier " +year;
    calendarBody += "</h1><form action='#' method='post'><table class='calendar'><tr><td colspan='7'>" +menuContent +"</td></tr>";
    calendarBody += "<tr><th id='calendarHead' colspan='7'>" +monthName +" " +year +"</th></tr>";

    // Days names
    calendarBody += "<tr class='dayNames'>";
    calendarBody += "<td data-day='0' data-month='"+monthSelected +"' data-year='"+year +"'><span>Dimanche</span></td>";
    calendarBody += "<td data-day='1' data-month='"+monthSelected +"' data-year='"+year +"'><span>Lundi</span></td>";
    calendarBody += "<td data-day='2' data-month='"+monthSelected +"' data-year='"+year +"'><span>Mardi</span></td>";
    calendarBody += "<td data-day='3' data-month='"+monthSelected +"' data-year='"+year +"'><span>Mercredi</span></td>";
    calendarBody += "<td data-day='4' data-month='"+monthSelected +"' data-year='"+year +"'><span>Jeudi</span></td>";
    calendarBody += "<td data-day='5' data-month='"+monthSelected +"' data-year='"+year +"'><span>Vendredi</span></td>";
    calendarBody += "<td data-day='6' data-month='"+monthSelected +"' data-year='"+year +"'><span>Samedi</span></td></tr>";
    calendarBody += "<tr>";

    // Days
    calendarBody += htmlContent;

    // End table
    calendarBody += "</tr></table></form>";

    // Set the content of div .
    document.getElementById("calendar").innerHTML = calendarBody;
}

/**
 * Change month of calendar
 * @param e
 * @returns {boolean}
 */
function changeMonth(e) {
    displayCalendar(e.target.value);
    document.querySelector('#calendarHead').innerHTML = formatMonthName(moment().month(e.target.value - 1).format('MMMM'))
        +" " +moment().format('YY');

    return false;
};

// Storage of selected days
// var days = [];

/**
 * Get all selected days of calendar
 * @returns {Array}
 */
function getAllDays() {
    var days = [];
    $('.monthNow').each(function() {
        if($(this).hasClass('daySelected')) {
            days.push($(this).data('day'));
        }
    });

    return days;
};

/**
 * Get all "sunday" or "monday, tuesday, ect ..." in a current month
 * @param year
 * @param monthSelected
 * @param daySelected
 * @returns {Array} Array of selected days
 */
function getSpecificalDays(year, monthSelected, daySelected) {
    // Get day name: ex "sunday"
    var daySelected = moment().day(daySelected).format('dddd');

    // First day of month
    var day = moment([year, monthSelected - 1])
        .startOf('month')
        .day(daySelected);

    // Storage of selected days
    var days = [];

    // Find & add day choice for every week of the current month
    if (day.date() > 7) day.add(7,'d');
    var month = day.month();

    // Loop for storage day in days array
    while(month === day.month()){
        days.push(moment(day).format('D'));
        day.add(7,'d');
    }
    return days;
};

/**
 * Formatting month name
 * @param monthName
 * @returns {string | * | void}
 */
function formatMonthName(monthName) {
    // First letter of month to uppercase
    monthNameFormatted = monthName.replace(monthName.toString().charAt(0),
        monthName.charAt(0).toUpperCase()) ;

    return monthNameFormatted;
}

/**
 * Displaying calendar in document
 */
document.addEventListener('DOMContentLoaded', function() {
    /* jQuery use: DOM ready  */
    $(function() {
        // All days selected storage
        var days = [];

        // Current date
        var dateNow = new Date();

        // Current month
        var month = dateNow.getMonth();

        // Formatting month with two characters ex. February: 02
        var formattedMonth = moment().month(month).format('MM');

        // Mouse events control
        var mouseDown = false;

        // Displaying calendar
        displayCalendar(formattedMonth);

        // Block for testing selected days
        var $daysHTML = $('<div id="allSelectedDays"></div>');

        // Appending and clearing div block for the test of selected days
        $('#calendar form').append($daysHTML);

        /**
         * Change event after selecting a month on select menu
         */
        $(document).on('change', '#months', function(e) {
            // Change month
            changeMonth(e);

            // Appending and clearing div block for the test of selected days
            $('#calendar form').append($daysHTML);
            $daysHTML.empty();

            /**
             * Draggable event to select a range of days
             */
            $('td.monthNow')
                .on("mousedown", function () {
                    // Set mouse down eventon true
                    mouseDown = true;

                    // Highlight first day case on mouse down
                    $(this).addClass("daySelected dayDragging");
                })
                .on("mouseover", function () {
                    if (mouseDown) {
                        // Highlight left day cases on mouse down
                        if ($(this).prevAll(".daySelected").length > 0) {
                            $(this).prevUntil(".daySelected").addClass("daySelected dayDragging");
                            $(this).nextAll(".daySelected").removeClass("daySelected dayDragging");
                        }
                        // Highlight right day cases on mouse down
                        if ($(this).nextAll(".daySelected").length > 0) {
                            $(this).nextUntil(".daySelected").addClass("daySelected dayDragging");
                            $(this).prevAll(".daySelected").removeClass("daySelected dayDragging");
                        }

                        // Highlight current day case on mouse down
                        $(this).addClass("daySelected dayDragging");
                    }
                });
        });

        /**
         * Draggable event to select a range of days
         */
        $('td.monthNow')
            .on("mousedown", function () {
                // Set mouse down eventon true
                mouseDown = true;

                // Highlight first day case on mouse down
                $(this).addClass("daySelected dayDragging");
            })
            .on("mouseover", function () {
                if (mouseDown) {
                    // Highlight left day cases on mouse down
                    if ($(this).prevAll(".daySelected").length > 0) {
                        $(this).prevUntil(".daySelected").addClass("daySelected dayDragging");
                        $(this).nextAll(".daySelected").removeClass("daySelected dayDragging");
                    }
                    // Highlight right day cases on mouse down
                    if ($(this).nextAll(".daySelected").length > 0) {
                        $(this).nextUntil(".daySelected").addClass("daySelected dayDragging");
                        $(this).prevAll(".daySelected").removeClass("daySelected dayDragging");
                    }

                    // Highlight current day case on mouse down
                    $(this).addClass("daySelected dayDragging");
                }
            });

        $(document).on("mouseup", function () {

            if (mouseDown) {
                // Register and get all selected days
                days = getAllDays();

                // Test : displaying all selected days
                if(typeof days !== 'undefined' && days.length > 0) {
                    $daysHTML.empty().html('<h3>--- Réssultat de votre sélection ---</h3>' + days.join('-'));
                } else {
                    $daysHTML.empty();
                }

                $(".dayDragging").removeClass("dayDragging");
            }

            mouseDown = false;


        });

        /**
         * Click event to select a day
         * Highlight a selected day
         */
        $(document).on('dblclick', 'td.monthNow', function() {
            // Toogle highlight css to select/deselect day
            $(this).toggleClass('daySelected');

            // Register and get all selected days
            days = getAllDays();

            // Test : displaying all selected days
            if(typeof days !== 'undefined' && days.length > 0) {
                $daysHTML.empty().html('<h3>--- Réssultat de votre sélection ---</h3>' + days.join('-'));
            } else {
                $daysHTML.empty();
            }
        });

        /**
         * Click event to select a range of days
         * Get all "sunday" or "monday, tuesday, ect ..." in a current month
         */
        $(document).on('click', '.dayNames td', function() {
            // Memorize click
            $(this).toggleClass('actived');

            // Storage selected days
            var specificalDays = [];

            // Get specifical days
            specificalDays = getSpecificalDays($(this).data('year'), $(this).data('month'), $(this).data('day'));

            if($(this).hasClass('actived')) {
                // Highlight selected days with css
                for(var i=0; i < specificalDays.length; i++) {
                    $('.monthNow').each(function() {
                        if(parseInt(specificalDays[i]) === $(this).data('day')) {
                            $(this).addClass('daySelected');
                        }
                    });
                }
            } else {
                // Remove highlight css
                for(var i=0; i < specificalDays.length; i++) {
                    $('.monthNow').each(function() {
                        if(parseInt(specificalDays[i]) === $(this).data('day')) {
                            $(this).removeClass('daySelected');
                        }
                    });
                }
                // Remove selected items
                specificalDays.splice();
            }

            // Register and get all selected days
            days = getAllDays();

            // Test : displaying all selected days
            if(typeof days !== 'undefined' && days.length > 0) {
                $daysHTML.empty().html('<h3>--- Réssultat de votre sélection ---</h3>' + days.join('-'));
            } else {
                $daysHTML.empty();
            }

        });

    });

}, false);
