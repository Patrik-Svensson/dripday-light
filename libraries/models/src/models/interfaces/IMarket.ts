interface IMarket {
    productLink: string;
    country: string;
    saleStatus?: string;
    price?: string;
    currency?: string;
    lastScraped?: Date;
}

export { IMarket };