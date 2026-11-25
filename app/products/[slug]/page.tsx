import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CATALOG, ProductSKU } from '@/data/catalog';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { WhatsAppSimulator } from '@/components/WhatsAppSimulator';
import { FarmToKitchenStrip } from '@/components/FarmToKitchenStrip';
import { ProductDetailClient } from './ProductDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CATALOG.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = CATALOG.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | K&L Spices',
    };
  }

  return {
    title: `${product.name} | K&L Spices`,
    description: product.description,
    openGraph: {
      title: `${product.name} | K&L Spices Heritage Seasoning`,
      description: `${product.subtitle}. Price: ${product.priceDisplay}. Direct WhatsApp fulfillment desk dispatch.`,
      images: [product.dishImage || '/images/heritage_banner.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | K&L Spices`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = CATALOG.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-[#35160E] flex flex-col font-sans selection:bg-[#6B1713] selection:text-[#FAF4E8] overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <ProductDetailClient product={product} />
        <FarmToKitchenStrip />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppSimulator />
    </div>
  );
}
