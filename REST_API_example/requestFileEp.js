import sendRequest from "./features.js";

export default class EpRequests{
    #headers;
    constructor(token)
    {
        this.#headers = {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': `Bearer ${token}`
        };
    }
    async findOrderID(externalId)
    {
        const result = await sendRequest('GET', `https://core-api.epicentrm.cloud/v2/oms/orders?filter%5Bnumber%5D=${externalId}`, null, this.#headers)
        return result.id;
    }
    async getDataFromOrder(orderID)
    {
        const result = await sendRequest('GET', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}`, null, this.#headers);
        return result;
    }
    async getCityID(city, deliveryName)
    {
        const result = await sendRequest('GET', `https://core-api.epicentrm.cloud/v2/deliveries/${deliveryName}/settlements?offset=0&limit=10&title=${city}`, 
                             null, this.#headers);
        return result.items[0].id;
    }
    async changeClientData(orderID, obj)
    {
        await sendRequest('POST', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}/client-data`, obj, this.#headers);
    }
    async changeDelivery(orderID, deliveryName, obj)
    {
        await sendRequest('POST', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}/delivery-data/${deliveryName}`, obj, this.#headers);
    }
    async enteringTTN(orderID, deliveryNumber)
    {
        let typeMail = deliveryNumber.startsWith('2') ? 'nova_poshta' : 'ukrposhta';
        await sendRequest('POST', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}/delivery-number/${typeMail}`,
                    {number: deliveryNumber}, this.#headers);
    }
    async changeToCancel(orderID, rejectID)
    {
        let reason_code; let comment="Не влаштовує"; let translationKey;
        switch (rejectID) {
            case 35:
                reason_code= "customer_dissatisfied_with_the_shipping_cost";
                translationKey= "order.customer_cancel_reason.customer_dissatisfied_with_the_shipping_cost";
            break;
            case 36:
                reason_code= "customer_delivery_speed_too_slow";
                translationKey= "order.customer_cancel_reason.customer_delivery_speed_too_slow";
            break;
            case 37:
                reason_code= "customer_product_characteristics_are_not_suitable";
                translationKey= "order.customer_cancel_reason.customer_product_characteristics_are_not_suitable";
            break;
            case 38:
                reason_code= "customer_not_timely_confirmation_of_the_availability_of_goods";
                comment= "Нема в наявностi";
                translationKey= "order.customer_cancel_reason.customer_not_timely_confirmation_of_the_availability_of_goods";
            break;
            case 39:
                reason_code= "customer_failed_to_contact";
                comment= "Не вийшло зв`язатись";
                translationKey= "order.customer_cancel_reason.customer_failed_to_contact";
            break;
            case 40:
                reason_code= "customer_other_reason";
                comment= "Клiєнт передумав!";
                translationKey= "order.customer_cancel_reason.customer_other_reason";
            break;
            case 41:
                reason_code= "customer_bought_elsewhere_as_a_gift";
                comment= "Вже придбав";
                translationKey= "order.customer_cancel_reason.customer_bought_elsewhere_as_a_gift";
            break;
            case 42:
                reason_code= "customer_order_duplicate";
                comment= "Дубль замовлення";
                translationKey= "order.customer_cancel_reason.customer_order_duplicate";
            break;
            case 61:
                reason_code= "customer_other_reason";
                comment= "Передплату не було сплачено!";
                translationKey= "order.customer_cancel_reason.customer_other_reason";
            break;
            case 62:
                reason_code= "customer_prepayment_required";
                translationKey= "order.customer_cancel_reason.customer_prepayment_required";
            break;
        }

        await sendRequest('POST', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}/change-status/to/canceled`,
                    {reason_code, comment, translationKey}, this.#headers);
    }
    async changeToConfirmed(orderID)
    {
        this.changeCallStatus(orderID);
        await sendRequest('POST', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}/change-status/to/confirmed`, null, this.#headers);
    }
    async changeToConfirmedByMerchant(orderID)
    {
        await sendRequest('POST', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}/change-status/to/confirmed_by_merchant`, null, this.#headers);
    }
    async changeCallStatus(orderID, callID)
    {
        console.log(callID);
        let callStatus;
        switch (callID) {
            case 10:
                callStatus='first_fail';
                break;
            case 12:
                callStatus='second_fail';
                break;
            default:
                callStatus='success';
                break;
        }

        await sendRequest('POST', `https://core-api.epicentrm.cloud/v2/oms/orders/${orderID}/call-status`, 
                    {callStatus}, this.#headers);
    }

}
