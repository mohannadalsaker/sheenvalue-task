import type { ReactNode } from "react";

const ProductViewSection = ({ children }: { children: ReactNode }) => {
  return (
    <div className="rounded-lg bg-white p-6 border border-slate-200">
      {children}
    </div>
  );
};

export default ProductViewSection;
