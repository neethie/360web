export const convertDate = (isoDate) => {
    const date = new Date(isoDate);
    const newDate = date.toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return newDate;
};