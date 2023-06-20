export default function currencyFormat(num) {
    let numb = 0;
    if(num){
        numb = 'TZS ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return numb;
}