interface ProductPriceProps {
  readonly price: number;
  readonly oldPrice?: number;
  readonly className?: string;
}

function formatCurrency(amount: number): string {
  return `PKR ${amount.toLocaleString('en-PK')}`;
}

export default function ProductPrice({ price, oldPrice, className = '' }: ProductPriceProps) {
  return (
    <div className={`flex items-baseline gap-2 ${className}`}>
      <span className="text-lg font-bold text-primary">{formatCurrency(price)}</span>
      {oldPrice && (
        <span className="text-sm text-muted line-through">{formatCurrency(oldPrice)}</span>
      )}
    </div>
  );
}
