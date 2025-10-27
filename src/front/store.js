export const initialStore=()=>{
  return{
    is_login: false,
    jwtKey: "",
    infoUser: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'set_is_login':
      
      return {
        ...store,
        is_login: action.payload.is_login_or_not
      };
    case 'setKey':
      return{
        ...store,
        jwtKey: action.payload.setKeyObj
      }
    case 'setInfoUser':
        return{
          ...store,
          infoUser: action.payload.setInfoUserObj
        }
    default:
      throw Error('Unknown action.');
  }    
}
