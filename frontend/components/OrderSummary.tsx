interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function OrderSummary({ subtotal, shipping, tax, total }: OrderSummaryProps) {
  return (
    <div className="rounded-[1.75rem] border border-black/10 bg-white p-6 shadow-luxe">
      <h3 className="text-lg font-semibold text-charcoal">Order Summary</h3>
      <dl className="mt-6 space-y-4 text-sm text-stone">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd>${shipping.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Tax</dt>
          <dd>${tax.toFixed(2)}</dd>
        </div>
        <div className="border-t border-black/10 pt-4 text-base font-semibold text-charcoal">
          <dt>Total</dt>
          <dd>${total.toFixed(2)}</dd>
        </div>
      </dl>
    </div>
  );
}
