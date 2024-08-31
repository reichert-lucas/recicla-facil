export const formatMoney = (value: number) => {
    let real = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return real.format(value)
}