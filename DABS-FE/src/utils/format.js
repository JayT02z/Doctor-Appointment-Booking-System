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