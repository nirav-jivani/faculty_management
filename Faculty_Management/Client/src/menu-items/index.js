import { dashboard } from './dashboard';
// import { utilities } from './utilities';
import { Events } from './Events';
import { Publications } from './Publications';
import { Admin } from './Admin';

//-----------------------|| MENU ITEMS ||-----------------------//

// const account = JSON.parse(localStorage.getItem('berry-account'));
// const user = JSON.parse(account.user);
// console.log(account);
const menuItems = {
    items: [dashboard, Admin, Events, Publications]
};

export default menuItems;
