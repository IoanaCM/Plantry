function timeTheme() {
    let currentDate = new Date()
    let time = currentDate.getHours()
    let night = time > 18 || time < 6
    if (night){
        $("#fakeSky").css("background-color", "#191970")
    } else {
        $("#fakeSky").css("background-color", "#d0ddd7")
    }
}

