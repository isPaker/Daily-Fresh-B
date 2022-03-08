const roleToRoute = {
    coustomer: [
      {name: 'Goods'}, {name: 'GoodsList'}, {name: 'AddGoods'}, {name: 'EditGoods'}, {name: 'EditGood'}
    ],
    admin: [
      {name: 'Goods'}, {name: 'GoodsList'}, {name: 'AddGoods'}, {name: 'EditGoods'},{name: 'Category'}, {name: 'EditGood'}
    ]
}

export default function getDynamicRoute(role, routes){
    
    const routesName = roleToRoute[role]? roleToRoute[role].map(item => item.name) : [];
    
    const result = routes.filter(item => {
        
        if(routesName.indexOf(item.name) != -1){
            const child = item.children;
            item.children = child.filter(it => routesName.indexOf(it.name) != -1)
            return true;
        }
        return false;
    });

    return result;
}