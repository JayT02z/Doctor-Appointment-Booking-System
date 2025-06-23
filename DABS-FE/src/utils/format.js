export const formatCurrency = (amount) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export const formatTimeSlot = (slot) => {
    const timeParts = slot.replace('SLOT_', '').split('_');
    return timeParts.length === 2 ? `${timeParts[0]}:00 - ${timeParts[1]}:00` : slot;
};
