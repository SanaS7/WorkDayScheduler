const localeConfig = {};
dayjs.locale(localeConfig);

$(function () {
  const currentHour = dayjs().format("H");

  function updateHourlyColor() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id);
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
    });
  }

  function saveTextEntry() {
    $(".saveBtn").on("click", function () {
      const key = $(this).parent().attr("id");
      const value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }

  function refreshHourlyColor() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  $(".time-block").each(function () {
    const key = $(this).attr("id");
    const value = localStorage.getItem(key);
    $(this).children(".description").val(value);
  });

  function updateTime() {
    const dateElem = $("#date");
    const timeElem = $("#time");
    const currentDate = dayjs().format("dddd, MMMM D, YYYY");
    const currentTime = dayjs().format("hh:mm:ss A");
    dateElem.text(currentDate);
    timeElem.text(currentTime);
  }

  updateHourlyColor();
  saveTextEntry();
  refreshHourlyColor();

  setInterval(updateTime, 1000);
});
