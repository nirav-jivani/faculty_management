import { dashboard } from './dashboard';
// import { utilities } from './utilities';
import { Events } from './Events';
import { Publications } from './Publications';
import { Admin } from './Admin';
//-----------------------|| MENU ITEMS ||-----------------------//

const account = JSON.parse(localStorage.getItem('berry-account'));
const user = JSON.parse(account.user);
let menuItems = null;
if (user[0].UserType === 'Admin') {
    menuItems = {
        items: [dashboard, Admin]
    };
} else {
    menuItems = {
        items: [Events]
    };
}
export default menuItems;
