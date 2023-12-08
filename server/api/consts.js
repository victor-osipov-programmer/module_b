module.exports = {
    groups: [
        { group_id: 1, name: 'Admin', ru_name: 'Администратор' },
        { group_id: 2, name: 'Waiter', ru_name: 'Официант' },
        { group_id: 3, name: 'Cook', ru_name: 'Повар' },
    ],
    statuses: [
        { status_id: 1, name: 'working' },
        { status_id: 2, name: 'vacationer' }
    ],
    order_statuses: [
        { order_status_id: 1, name: 'accepted', ru_name: 'Принят' },
        { order_status_id: 2, name: 'canceled', ru_name: 'Отменён' },
        { order_status_id: 3, name: 'ready', ru_name: 'Готов' },
        { order_status_id: 4, name: 'paid-up', ru_name: 'Оплачен' },
        { order_status_id: 5, name: 'preparing', ru_name: 'Готовится' },
    ]
}