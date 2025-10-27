export const initialStore=()=>{
  return{
    is_login: false
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_is_login':
      
      return {
        ...store,
        is_login: action.payload.is_login_or_not
      };
    default:
      throw Error('Unknown action.');
  }    
}
