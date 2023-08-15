export const getNoteDate = (key: number) => {
  const current = new Date();
  const noteDate = new Date(key);

  const year = noteDate.getFullYear();
  const month = ("0" + (noteDate.getMonth() + 1)).slice(-2);
  const day = ("0" + noteDate.getDate()).slice(-2);

  const hours = ("0" + noteDate.getHours()).slice(-2);
  const minutes = ("0" + noteDate.getMinutes()).slice(-2);
  const ampm = noteDate.getHours() >= 12 ? "PM" : "AM";

  const dateString = `${year}/${month}/${day}`;
  const timeString = `${hours}:${minutes} ${ampm}`;

  const diffDate = noteDate.getTime() - current.getTime();
  const diff = Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24)));

  if (diff > 0) {
    return dateString;
  } else {
    return timeString;
  }
};
