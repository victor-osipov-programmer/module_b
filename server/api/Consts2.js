class Consts {
    static get(key, value) {
        return this.array.find(el => el[key] == value);
    }
}

class Groups extends Consts {
    static array = [
        { id: 1, name: 'Admin', ru_name: 'Администратор' },
        { id: 2, name: 'Waiter', ru_name: 'Официант' },
        { id: 3, name: 'Cook', ru_name: 'Повар' },
    ];
}

class UserStatuses extends Consts {
    static array = [
        { id: 1, name: 'working', ru_name: 'Работает' },
        { id: 2, name: 'vacationer', ru_name: 'Отдыхает' }
    ];
}

class OrderStatuses extends Consts {
    static array = [
        { id: 1, name: 'accepted', ru_name: 'Принят' },
        { id: 2, name: 'canceled', ru_name: 'Отменён' },
        { id: 3, name: 'ready', ru_name: 'Готов' },
        { id: 4, name: 'paid-up', ru_name: 'Оплачен' },
        { id: 5, name: 'preparing', ru_name: 'Готовится' },
    ];
}

module.exports = {
    Groups, UserStatuses, OrderStatuses
}