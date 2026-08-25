import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Phone, Calendar, ArrowRight, Tag, Loader2 } from "lucide-react";
import evadaleLogo from "@assets/evadale_badge_transparent_1762195601095.png";
import type { BlogPost } from "@shared/schema";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
  });

  useEffect(() => {
    document.title = "Contractor Tips & RV Living Guide | Evadale RV Park Blog";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Helpful articles for refinery contractors about affordable RV living near Beaumont and Port Arthur, TX. Tips, cost comparisons, and turnaround season guides.");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-foreground text-background py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <img src={evadaleLogo} alt="Evadale RV Park Logo" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-xl font-bold font-serif">Evadale RV Park</h1>
                <p className="text-background/70 text-sm">Affordable. Convenient. All-Inclusive.</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-6 text-background/90">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <Link href="/blog" className="hover:text-accent transition-colors font-semibold">Blog</Link>
              <a href="tel:4092768830" className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" />
                <span>(409) 276-8830</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Blog Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-3">Contractor Tips & RV Living Guide</h2>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Helpful articles for refinery contractors looking for affordable housing near Beaumont and Port Arthur, TX.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : posts && posts.length > 0 ? (
              posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <article className="group bg-card rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 cursor-pointer border border-border/50">
                    <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.publishedAt ? new Date(post.publishedAt).toISOString() : ''}>
                        {post.publishedAt ? formatDate(post.publishedAt.toString()) : ''}
                      </time>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground font-serif mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="inline-flex items-center space-x-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            <Tag className="w-3 h-3" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center space-x-1 text-primary font-semibold text-sm">
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <p>No blog posts yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold font-serif mb-2">Only $425/month — All Bills Paid</h2>
          <p className="text-primary-foreground/90 mb-4">Limited spots available. Reserve yours today.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:4092768830"
              className="inline-flex items-center space-x-2 bg-white text-primary px-6 py-3 rounded-xl font-bold hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call Brian: (409) 276-8830</span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
            >
              <span>Reserve Online</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Evadale RV Park. 147 CR 847, Evadale, TX 77615</p>
        </div>
      </footer>
    </div>
  );
}
