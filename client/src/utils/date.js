export const convertDate = (isoDate) => {
    const date = new Date(isoDate);

    const utcHours = date.getUTCHours();

    const guatemalaDate = new Date(date);
    guatemalaDate.setUTCHours(utcHours + 6);

    const newDate = guatemalaDate.toLocaleString("es-GT", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return newDate;
};

export const monthsString = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abri",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];
