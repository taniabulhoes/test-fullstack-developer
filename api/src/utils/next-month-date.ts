export function nextMonthDate(amountMonth: number, day: number, year?: number, ){
  
  const currentDate = new Date();

  let currentMonth = currentDate.getMonth();

  currentMonth = currentMonth + amountMonth;

  if (currentMonth > 11) {
    currentMonth = 0;
  }

  const dataProximoMes = new Date(year ?? currentDate.getFullYear(), currentMonth, day);

  return dataProximoMes
}