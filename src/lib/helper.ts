import { OrderItemProps } from "@/app/providers/order";

export function calculateTotalOrder(orders: OrderItemProps[]) {
    return orders.reduce((total, item) => {
        const itemTotal = parseFloat(item.product.price) * item.amount;
        return total + itemTotal;
    }, 0)
}