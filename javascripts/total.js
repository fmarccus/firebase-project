//real time computation of total amount
$(document).ready(function () {
    $("#sum").val("0");
    $(".key").val("");

    function calc() {
        var $num1 = +$("#selling_price").val();
        var $num2 = +$("#quantity_item").val();
        $("#sum").val($num1 * $num2);
    }
    $(".key").keyup(function () {
        calc();
    });
});