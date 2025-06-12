import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">

      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-6xl font-bold trust-blue">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
        <p className="text-muted-foreground">

          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="pt-4">
          <Link href="/">
            <Button
              className="gradient-brand text-white hover:opacity-90 transition-opacity"
              size="lg"
            >
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 