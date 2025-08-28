
function formatDateTime(dateInput: any, type:string) {
  const date = new Date(dateInput);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  if (type === "yyyy-mm-dd") {
    return `${year}-${month}-${day}`;
  }
  else {
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  }
}

export default formatDateTime