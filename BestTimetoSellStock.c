int maxProfit(int* prices, int pricesSize) {
    /*int max = 0;
    for(int i = 0; i < pricesSize; ++i){
        for(int j = i+1; j < pricesSize; ++j){
            if(prices[j]-prices[i] > max){
                max = prices[j] - prices[i];
            }
        }

        
    }*/
    int min_price = prices[0];
    int max_profit = 0;
    for(int i = 1; i < pricesSize; ++i){
        if(prices[i] < min_price){
            min_price = prices[i];
        }
        else{
            int profit = prices[i]-min_price;
            if(profit > max_profit){
                max_profit = profit;
            }
        }
    }
    return max_profit;
    
}