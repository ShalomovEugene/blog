const convertDate = (postDate: string) => {
  const date = new Date(postDate);
  const offset = 3 * 60;
  const localDate = new Date(date.getTime() + offset * 60 * 1000);

  const day = String(localDate.getUTCDate()).padStart(2, "0");
  const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
  const year = localDate.getUTCFullYear();
  const hours = String(localDate.getUTCHours()).padStart(2, "0");
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export default convertDate;
