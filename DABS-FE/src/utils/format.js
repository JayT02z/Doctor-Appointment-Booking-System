export const formatCurrency = (amount) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export const formatTimeSlot = (slot) => {
    const timeParts = slot.replace('SLOT_', '').split('_');
    return timeParts.length === 2 ? `${timeParts[0]}:00 - ${timeParts[1]}:00` : slot;
};

export const formatDOB = (dobArray) => {
    return dobArray
        ? `${dobArray[0]}-${String(dobArray[1]).padStart(2, "0")}-${String(dobArray[2]).padStart(2, "0")}`
        : "";
};

export const formatDate = (arr) => {
    if (!arr || arr.length < 3) return "-";
    return `${arr[2].toString().padStart(2, "0")}/${arr[1].toString().padStart(2, "0")}/${arr[0]}`;
};

export const formatDate_appointment = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Add ordinal suffix to day number (1st, 2nd, 3rd, etc.)
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${dayName}, ${month} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}, ${year}`;
};

export const ratingStringToNumber = (rating) => {
    switch (rating) {
        case "ONE_STAR":
            return 1;
        case "TWO_STAR":
            return 2;
        case "THREE_STAR":
            return 3;
        case "FOUR_STAR":
            return 4;
        case "FIVE_STAR":
            return 5;
        default:
            return 0;
    }
};