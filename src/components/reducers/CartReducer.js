import {
    ADD_TO_CART,
    REMOVE_ITEM,
    SUB_QUANTITY,
    ADD_QUANTITY,
    SET_ALL_PRODUCTS_LIST, CLEAR_ALL
} from '../actions/action-types/cart-actions'


const initState = {
    items: [],
    addedItems: [],
    total: 0
};

const cartReducer = (state = initState, action) => {

    if (action.type === SET_ALL_PRODUCTS_LIST) {
        return {
            ...state,
            items: action.products
        }
    }
    //INSIDE HOME COMPONENT
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id);
        let existed_item = state.addedItems.find(item => action.id === item.id);
        if (existed_item) {
            existed_item.quantity += action.quantity;
            return {
                ...state,
                total: state.total + action.quantity * addedItem.price
            }
        } else {
            addedItem.quantity = action.quantity;
            //calculating the total
            let newTotal = state.total + action.quantity * addedItem.price;

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }

        }
    }
    if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id);
        let new_items = state.addedItems.filter(item => action.id !== item.id);

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity);
        console.log(itemToRemove);
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id);
        addedItem.quantity += 1;
        let newTotal = state.total + addedItem.price;
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === SUB_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id);
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id);
            let newTotal = state.total - addedItem.price;
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        } else {
            addedItem.quantity -= 1;
            let newTotal = state.total - addedItem.price;
            return {
                ...state,
                total: newTotal
            }
        }

    }
    if (action.type === CLEAR_ALL) {
        return {
            ...state,
            addedItems: [],
            total: 0
        }
    }
    return state

};

export default cartReducer
