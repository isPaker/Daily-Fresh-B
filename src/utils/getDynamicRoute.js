const roleToRoute = {
    coustomer: [
      {name: 'Goods'}, {name: 'GoodsList'}, {name: 'AddGoods'}, {name: 'EditGoods'}
    ],
    admin: [
      {name: 'Goods'}, {name: 'GoodsList'}, {name: 'AddGoods'}, {name: 'EditGoods'},{name: 'Category'}
    ]
}

export default function getDynamicRoute(role, routes){
    
    const routesName = roleToRoute[role].map(item => item.name);
    
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