export const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  return dateString.split(" ")[0].split("-").join("/");
};

export const formateDateTime = (dateString: string | null | undefined) => {
  if (!dateString) return null;
  return new Date(dateString.replace(" ", "T")).toISOString();
};
