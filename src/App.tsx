import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CustomerOrdersView } from './components/CustomerOrdersView';
import { SellerDashboard } from './components/SellerDashboard';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { currentView, selectedProduct, setSelectedProduct } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-slate-900">
      <Header />

      <main className="flex-1">
        {currentView === 'catalog' && (
          <>
            <HeroBanner />
            <ProductGrid />
          </>
        )}

        {currentView === 'orders' && <CustomerOrdersView />}

        {currentView === 'seller_dashboard' && <SellerDashboard />}
      </main>

      <Footer />

      {/* Interactive Overlays & Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
