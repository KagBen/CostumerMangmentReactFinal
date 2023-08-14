//** this fuction change the array that fetch from firebase to visualize as we want the information */

const aggregateOrders = (orders) => { 

    const aggregationOrders = [];
   
    orders.forEach((order) => {

        const  {CostumerId, ProductId, date } = order;

        //first we check if the costumer is already exist.
        const existingCostumer = aggregationOrders.find((order)=>{return order.CostumerId===CostumerId})
        
        if(existingCostumer)
        {
           
            //if the name exist ,check if product already exist in the product array
            const existingProduct = existingCostumer.products.find((prod)=>{
                return prod.ProductId===ProductId})

            if(existingProduct)
            {
               
   
                //// Check if the date already exists for the product 
               
                existingProduct.dates.push({date:date});
                
            }
            else{
                existingCostumer.products.push({ProductId:ProductId,dates:[{date:date}]})
            }
            
        }
        else{
            aggregationOrders.push({CostumerId:CostumerId , products:[{ProductId:ProductId,dates:[{date:date}]}]})
        }
    
    });
    return aggregationOrders;
    
}


export default aggregateOrders;