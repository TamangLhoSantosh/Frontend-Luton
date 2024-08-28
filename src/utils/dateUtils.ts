// Format date so that it can be sent to the server
export const formatDate = (date: Date | null): Date | null => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return new Date(`${year}-${month}-${day}`);
};
